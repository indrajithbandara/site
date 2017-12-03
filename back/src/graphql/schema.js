import Thrower from '@gik/tools-thrower';
// Local
import { AuthClient, TokenValidate } from 'auth/client';

export default function Resolvers() {

    const users = this.service('users');

    return {

        Query: {

            // Get a list of users (protected)
            users: ((root, vars, { token }) => TokenValidate(token)
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
                .then(({ accessToken: token }) => TokenValidate(token)
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

            userAdd: (root, vars, { token }) => TokenValidate(token)
                .then(() => users.create(vars)),

            userDel: (root, vars, { token }) => TokenValidate(token)
                .then(() => users.remove(vars._id)),

            userMod: (root, vars, { token }) => TokenValidate(token)
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
