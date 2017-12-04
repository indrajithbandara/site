import Thrower from '@gik/tools-thrower';
// Local
import { AuthClient, TokenValidate } from 'auth/client';
import {
    FieldGetter,
    TypeOutput,
    TypeList,
    TypeID,
    TypeString,
} from 'graphql/types';

const get = FieldGetter({
    _id: {
        description: 'The unique identifier for this user.',
        type: TypeID,
    },
    email: {
        description: 'An email address for this user.',
        type: TypeString,
    },
    password: {
        description: 'The password that identifies this user.',
        type: TypeString,
    },
    token: {
        description: 'Key that allows this user to consume protected resources.',
        type: TypeString,
    },
    nameFirst: {
        description: 'The first name of the user.',
        type: TypeString,
    },
    nameLast: {
        description: 'The last name of the user.',
        type: TypeString,
    },
});

export const TypeUserOutput = new TypeOutput({
    description: 'A person that has admin access to the website.',
    name: 'UserOutput',
    fields: {
        _id: get('_id', true),
        email: get('email'),
        token: get('token'),
        nameFirst: get('nameFirst'),
        nameLast: get('nameLast'),
    },
});

export default service => ({

    Query: {

        users: {
            description: '[protected] Returns a list of all users.',
            type: new TypeList(TypeUserOutput),
            resolve: (root, vars, { token }) => TokenValidate(token)
                .then(() => service.find()),
        },

        user: {
            description: '[public] Logins an user.',
            type: TypeUserOutput,
            args: {
                email: get('email', true),
                password: get('password', true),
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
                .then(({ _id, token }) => service
                    .get(_id)
                    .then(user => ({ ...user, token })),
                )
                // if an error happens (no matter the type) send back this error.
                // the error will be catched by the logger on hooks anyways.
                .catch(() => Thrower('Invalid credentials', 'AuthError')),
        },
    },

    Mutation: {

        userAdd: {
            description: '[protected] Adds a new user.',
            type: TypeUserOutput,
            args: {
                email: get('email', true),
                password: get('password', true),
                nameFirst: get('nameFirst'),
                nameLast: get('nameLast'),
            },
            resolve: (root, args, { token }) => TokenValidate(token)
                .then(() => service.create(args)),
        },

        userMod: {
            description: '[protected] Updates existing user.',
            type: TypeUserOutput,
            args: {
                _id: get('_id', true),
                email: get('email', true),
                password: get('password', true),
                nameFirst: get('nameFirst'),
                nameLast: get('nameLast'),
            },
            resolve: (root, args, { token }) => TokenValidate(token)
                .then(() => {
                    const { _id } = args;
                    return service.patch(_id, Object
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
            description: '[protected] Removes existing user',
            type: TypeUserOutput,
            args: {
                _id: get('_id', true),
            },
            resolve: (root, { _id }, { token }) => TokenValidate(token)
                .then(() => service.remove(_id)),
        },
    },

});
