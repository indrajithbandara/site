import HTTP from 'http';
import URL from 'url';
import { makeExecutableSchema as SchemaGQL } from 'graphql-tools';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute as GraphqlExecute, subscribe as GraphqlSubscribe } from 'graphql';
import {
    graphqlExpress as ExpressGQL,
    graphiqlExpress as ExpressGuiQL,
} from 'graphql-server-express';
// Local
import { Back as Config } from 'config';
import Log from 'logger';
import TypeDefs from './schema.graphql';
import Resolvers from './schema';

export default function GraphQL() {

    const schema = SchemaGQL({ typeDefs: TypeDefs, resolvers: Resolvers.call(this) });

    this.use(Config.endpoints.graphql.pathname, ExpressGQL({
        schema,
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
    }));

    if (process.env.NODE_ENV !== 'production') {
        this.get(Config.endpoints.graphiql.pathname, ExpressGuiQL({
            endpointURL: Config.endpoints.graphql.pathname,
            subscriptionsEndpoint: [
                URL.format(Config.endpoints.socket),
            ],
        }));
    }
    // Configure subscriptions socket
    const ws = HTTP.createServer(this);
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
}
