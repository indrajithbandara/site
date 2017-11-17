import FeathersClient from 'feathers-client';
import SuperAgent from 'superagent';
import Config from 'config';

// In order to not create a dependency on the Schema
// the authentication step will be managed externally.
const client = FeathersClient()
    .configure(FeathersClient
        .rest(`http://${Config['server.host']}:${Config['server.port']}`)
        .superagent(SuperAgent),
    )
    .configure(FeathersClient.hooks())
    .configure(FeathersClient.authentication({
        path: Config['auth.path'],
        service: Config['auth.service'],
    }));

export default function Resolvers() {

    const tacos = this.service('tacos');
    const users = this.service('users');


    return {
        Query: {

            tacos: (root, query) => tacos.find({ query }),

            taco: (root, { _id }) => tacos.get(_id),

            user: (root, { email, password }) => client
                .authenticate({
                    strategy: 'local',
                    email,
                    password,
                })
                .then(({ accessToken: token }) => client.passport
                    .verifyJWT(token)
                    .then(({ userId: _id }) => ({ _id, token })),
                )
                .then(({ _id, token }) => users
                    .get(_id)
                    .then(user => ({ ...user, token })),
                ),

        },
        Mutation: {

            tacoAdd: (root, data, context) => tacos.create(data, context),

            userAdd: (root, data) => users.create(data),

        },
    };
}
