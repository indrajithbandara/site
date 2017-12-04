import Thrower from '@gik/tools-thrower';
// Local
import { AuthClient, TokenValidate } from 'auth/client';
import {
    Type,
    TypeSchema,
    TypeList,
    TypeNonNull,
    TypeID,
    TypeString,
    TypeUser,
} from './types';

export default function Schema() {

    const users = this.service('users');

    return new TypeSchema({

        query: new Type({
            name: 'Query',
            description: 'All the queries available on the server',
            fields: {

                users: {
                    name: 'users',
                    description: '[protected] Returns a list of all users.',
                    type: new TypeList(TypeUser),
                    resolve: (root, vars, { token }) => TokenValidate(token)
                        .then(() => users.find()),
                },

                user: {
                    name: 'user',
                    description: '[public] Logins an user.',
                    type: TypeUser,
                    args: {
                        email: { type: new TypeNonNull(TypeString) },
                        password: { type: new TypeNonNull(TypeString) },
                    },
                    resolve: (root, { email, password }) => AuthClient
                        // Use the client to make a cal to authenticate
                        .authenticate({
                            strategy: 'local',
                            email,
                            password,
                        })
                        // Auth succesful, make sure the token is valid an return it.
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
            },
        }),

        mutation: new Type({
            name: 'Mutation',
            description: 'All the mutations available on the server',
            fields: {

                userAdd: {
                    name: 'userAdd',
                    description: '[protected] Adds a new user.',
                    type: TypeUser,
                    args: {
                        email: { type: new TypeNonNull(TypeString) },
                        password: { type: new TypeNonNull(TypeString) },
                        nameFirst: { type: TypeString },
                        nameLast: { type: TypeString },
                    },
                    resolve: (root, args, { token }) => TokenValidate(token)
                        .then(() => users.create(args)),
                },

                userMod: {
                    name: 'userMod',
                    description: '[protected] Updates existing user.',
                    type: TypeUser,
                    args: {
                        _id: { type: new TypeNonNull(TypeID) },
                        email: { type: new TypeNonNull(TypeString) },
                        password: { type: new TypeNonNull(TypeString) },
                        nameFirst: { type: TypeString },
                        nameLast: { type: TypeString },
                    },
                    resolve: (root, args, { token }) => TokenValidate(token)
                        .then(() => {
                            const { _id } = args;
                            return users.patch(_id, Object
                                .keys(args)
                                // removes the _id and non-thruthy props
                                .reduce((acc, key) => {
                                    if (key === '_id' || !args[key]) return acc;
                                    return { ...acc, [key]: args[key] };
                                }, {}),
                            );
                        }),
                },

                userDel: {
                    name: 'userDel',
                    description: '[protected] Removes existing user',
                    type: TypeUser,
                    args: {
                        _id: { type: new TypeNonNull(TypeID) },
                    },
                    resolve: (root, { _id }, { token }) => TokenValidate(token)
                        .then(() => users.remove(_id)),
                },
            },
        }),
    });
}
