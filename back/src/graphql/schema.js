import Thrower from '@gik/tools-thrower';
// Local
import { env as Env } from 'config';
import AuthClient from 'auth/client';

const priv = Env !== 'production';

export default function Resolvers() {

    const tacos = this.service('tacos');
    const users = this.service('users');
    return {

        Query: {

            tacos: (root, query) => tacos.find({ query }),

            taco: (root, { _id }) => tacos.get(_id),

            users: priv
                ? (() => users.find())
                : {},

            user: (root, { email, password }) => AuthClient
                .authenticate({
                    strategy: 'local',
                    email,
                    password,
                })
                .catch(() => Thrower('Invalid Credentials', 'AuthError'))
                .then(({ accessToken: token }) => AuthClient.passport
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

            userAdd: priv
                ? ((root, data) => users.create(data))
                : {},

        },
    };
}
