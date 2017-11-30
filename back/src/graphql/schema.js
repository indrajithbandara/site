import Thrower from '@gik/tools-thrower';
// Local
import { Env } from 'config';
import AuthClient from 'auth/client';

const priv = Env !== 'production';

export default function Resolvers() {

    const users = this.service('users');

    return {

        Query: {

            // Get a list of users (protected)
            users: ((root, vars, { token }) => AuthClient.passport
                .verifyJWT(token)
                .catch(() => Thrower('Invalid token', 'AuthError'))
                .then(() => users.find())
            ),

            // Get an specific user (public)
            user: (root, { email, password }) => AuthClient
                // Use the client to make a cal to authenticate
                .authenticate({
                    strategy: 'local',
                    email,
                    password,
                })
                // Authentication was correct, make sure the token is valid an return it.
                .then(({ accessToken: token }) => AuthClient.passport
                    .verifyJWT(token)
                    .then(({ userId: _id }) => ({ _id, token })),
                )
                // Complement the user information with the database.
                .then(({ _id, token }) => users
                    .get(_id)
                    .then(user => ({ ...user, token })),
                )
                // if an error happens (no matter the type) send back this error.
                // the error will be catched by the logger on hooks anyways.
                .catch(() => Thrower('Invalid credentials', 'AuthError')),
        },

        Mutation: {

            userAdd: !priv
                ? {}
                : (root, data) => users.create(data),

            userDel: (root, vars, { token }) => AuthClient.passport
                .verifyJWT(token)
                .catch(() => Thrower('Invalid token', 'AuthError'))
                .then(() => users.remove(vars._id)),

            userMod: (root, vars, { token }) => AuthClient.passport
                .verifyJWT(token)
                .catch(() => Thrower('Invalid token', 'AuthError'))
                .then(() => {
                    const { _id: id } = vars;
                    return users.patch(id, Object
                        .keys(vars)
                        .reduce((acc, key) => {
                            if (key === '_id' || !vars[key]) return acc;
                            return { ...acc, [key]: vars[key] };
                        }, {}),
                    );
                }),
        },
    };
}
