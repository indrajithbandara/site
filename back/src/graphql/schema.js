import Thrower from '@gik/tools-thrower';
// Local
import Log from 'logger';
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
                .authenticate({
                    strategy: 'local',
                    email,
                    password,
                })
                .catch((error) => {
                    Log.debug(error);
                    Thrower('Invalid Credentials', 'AuthError');
                })
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
