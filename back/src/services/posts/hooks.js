import Thrower from '@gik/tools-thrower';

const userVerify = payload => payload.app
    .service('users')
    .get(payload.data.user)
    .catch(() => Thrower('Invalid user', 'PostUserError'))
    .then(() => payload);

const dateAdd = payload => ({
    ...payload,
    data: { ...payload.data, dateAdd: new Date() },
});

const userGet = payload => new Promise((resolve, reject) => {
    const users = payload.app.service('users');
    payload.result.forEach((post, i) => users
        .get(post.user)
        .catch(err => reject(
            Thrower(['Invalid user: %s', err.message], 'PostUserError', false),
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
        patch: [userVerify],
        remove: [],
    },

    after: {
        all: [],
        find: [userGet],
        get: [],
        create: [],
        update: [],
        patch: [],
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
