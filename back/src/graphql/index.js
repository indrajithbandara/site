import { makeExecutableSchema as SchemaGQL } from 'graphql-tools';
import {
    graphqlExpress as ExpressGQL,
    graphiqlExpress as ExpressGuiQL,
} from 'graphql-server-express';
// Local
import { raw as Config } from 'config';
import Log from 'logger';
import TypeDefs from './schema.graphql';
import Resolvers from './schema';

const { graphql: config } = Config;

export default function GraphQL() {

    this.use(config.path, ExpressGQL({
        schema: SchemaGQL({
            typeDefs: TypeDefs,
            resolvers: Resolvers.call(this),
        }),
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
        this.get(`${config.path}-ui`, ExpressGuiQL({
            endpointURL: config.path,
        }));
    }
}
