import { makeExecutableSchema as SchemaGQL } from 'graphql-tools';
import {
    graphqlExpress as ExpressGQL,
    graphiqlExpress as ExpressGuiQL,
} from 'graphql-server-express';
// Local
import Schema from './schema.graphql';
import Resolvers from './resolvers';

export default function Service(name) {

    const endpoint = `/${name}`;

    this.use(endpoint, ExpressGQL({
        schema: SchemaGQL({
            typeDefs: Schema,
            resolvers: Resolvers.call(this),
        }),
    }));

    if (process.env.NODE_ENV !== 'production') {
        this.get(`${endpoint}-ui`, ExpressGuiQL({
            endpointURL: endpoint,
        }));
    }
}
