import Thrower from '@gik/tools-thrower';
// Local
import Log from 'logger';

const userVerify = (payload) => {
    Log.debug('userVerify', payload.data);
    return payload.app
        .service('users')
        .get(payload.data.user)
        .catch(err => Thrower(['Invalid user: %s', err.message], 'UserVerifyError'))
        .then(() => payload);
};

const dateAdd = (payload) => {
    const data = { ...payload.data, dateAdd: new Date() };
    Log.debug('dateAdd', data);
    return { ...payload, data };
};

const dateMod = (payload) => {
    const data = { ...payload.data, dateMod: new Date() };
    Log.debug('dateMod', data);
    return { ...payload, data };
};

const userGet = (payload) => {
    Log.debug('userGet', payload.result);
    return payload.app
        .service('users')
        .get(payload.result.user)
        .catch(err => Thrower(['Invalid user: %s', err.message], 'PostUserGetError'))
        .then(user => ({
            ...payload,
            result: { ...payload.result, user },
        }));
};

const usersGet = payload => new Promise((resolve, reject) => {
    const users = payload.app.service('users');
    payload.result.forEach((post, i) => users
        .get(post.user)
        .catch(err => reject(
            Thrower(['Invalid user: %s', err.message], 'PostUserGetError', false),
        ))
        .then((user) => {
            payload.result[i] = { ...post, user }; // eslint-disable-line no-param-reassign
            if (i === (payload.result.length - 1)) resolve(payload);
        }),
    );
});

export default {

    before: {
        all: [],
        find: [],
        get: [],
        create: [userVerify, dateAdd],
        update: [],
        patch: [userVerify, dateMod],
        remove: [],
    },

    after: {
        all: [],
        find: [usersGet],
        get: [userGet],
        create: [userGet],
        update: [],
        patch: [userGet],
        remove: [],
    },

    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: [],
    },
};
