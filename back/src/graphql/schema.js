/* eslint-disable */
import Thrower from '@gik/tools-thrower';
// Local
import { Env } from 'config';
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
                // Use the client to make a cal to authenticate
                .authenticate({
                    strategy: 'local',
                    email,
                    password,
                })
                // if an error happens (no matter the type) send back this error.
                // the error will be catched by the logger on hooks anyways.
                .catch(() => Thrower('Invalid credentials', 'AuthError'))
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
        },

        Mutation: {

            tacoAdd: (root, data, context) => tacos.create(data, context),

            userAdd: !priv
                ? {}
                : (root, data) => users.create(data),

            userDel: !priv
                ? {}
                : (root, { _id: id }) => users.remove(id),

            userMod: !priv
                ? {}
                : (root, data) => {
                    const { _id: id } = data;
                    return users.patch(id, Object
                        .keys(data)
                        .reduce((acc, key) => {
                            if (key === '_id' || !data[key]) return acc;
                            return { ...acc, [key]: data[key] };
                        }, {}),
                    );
                },
        },
    };
}
