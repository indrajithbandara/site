// Native
import HTTP from 'http';
import URL from 'url';
import PATH from 'path';
// NodeModules
import Thrower from '@gik/tools-thrower';
import { $ } from '@gik/tools-streamer';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute as GraphqlExecute, subscribe as GraphqlSubscribe } from 'graphql';
import {
    graphqlExpress as ExpressGQL,
    graphiqlExpress as ExpressGuiQL,
} from 'graphql-server-express';
// Local
import Log from 'logger';
import { Back as Config } from 'config';
import { TypeOutput, TypeSchema } from './types';
import Schema from './schema';

export default feathers => $
    // Get the corresponding service
    .from(feathers.get('services'))
    .map(name => ({ name, service: feathers.service(name) }))
    // make sure the service contains a correspoding schema.
    .switchMap(({ name, service }) => $
        // eslint-disable-next-line global-require
        .of(require(PATH.join('services', name, 'schema')).default)
        .catch(({ message }) => Thrower(
            ['Invalid Schema for %s service: %s', name, message],
            'GraphQLInitError',
        ))
        .map(schema => ({ name, schema: schema.call(feathers, service, name) })),
    )
    .toArray()
    // Populate root types using the schemas defined on each service
    .map(schemas => schemas.reduce((result, cur) => {
        const map = Object.keys(result).map(key => ({ key, name: result[key].name }));
        const { name: service, schema } = cur;
        Object.keys(schema).forEach((name) => {
            const fields = schema[name];
            const root = map.find(decl => decl.name === name);
            if (!root) Thrower(['Type "%s" not found in root.', name], 'GraphQLInitError');
            Object.assign(result[root.key].fields, fields);
        });
        Log.info('Schema %s registered', service);
        return result;
    }, Schema))
    .map((schema) => {
        // Register root types
        Object.keys(schema)
            // eslint-disable-next-line no-param-reassign
            .forEach((key) => { schema[key] = new TypeOutput(schema[key]); });
        return new TypeSchema(schema);
    })
    // Configure Express
    .do((schema) => {
        feathers.use(Config.endpoints.graphql.pathname, ExpressGQL(request => ({
            schema,
            // Expose headers sent as context (authentication token will travel there)
            context: request.headers,
            // Don't log errors to stderr, it'll be done by formatError
            debug: false,
            // don't format errors, we got this. (omiting stack for obscurity)
            formatError: (error) => {
                const { name, message, stack } = error.originalError
                    ? error.originalError
                    : error;
                Log.error('GraphQL: [%s] %s', name, message);
                Log.debug(stack);
                return { name, message };
            },
        })));

        if (process.env.NODE_ENV !== 'production') {
            feathers.get(Config.endpoints.graphiql.pathname, ExpressGuiQL({
                endpointURL: Config.endpoints.graphql.pathname,
                subscriptionsEndpoint: [
                    URL.format(Config.endpoints.socket),
                ],
            }));
        }

        // Configure subscriptions socket
        // TODO: Errors are not being formatted when using feathers interface, upon research
        //       found out about the  `formatResponse` method, so, dig into that.
        const ws = HTTP.createServer(feathers);
        SubscriptionServer.create(
            {
                schema,
                execute: GraphqlExecute,
                subcribe: GraphqlSubscribe,
            },
            {
                server: ws,
                path: Config.endpoints.socket.pathname,
            },
        );
        ws.listen(Config.ports.socket, Config.hosts.socket, () => Log
            .info('[socket] %s:%s', Config.hosts.socket, Config.ports.socket),
        );
    });
