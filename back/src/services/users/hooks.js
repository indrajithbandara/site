// import FeathersHooksCommon from 'feathers-hooks-common';
import FeathersAuth from 'feathers-authentication';
import FeathersAuthHooks from 'feathers-authentication-hooks';
import FeathersAuthLocal from 'feathers-authentication-local';

const hookAuth = [
    FeathersAuth.hooks.authenticate('jwt'),
];

const hookRestrict = [
    ...hookAuth,
    FeathersAuthHooks.restrictToOwner({ idField: '_id', ownerField: '_id' }),
];

const hookHash = [
    FeathersAuthLocal.hooks.hashPassword(),
];

const hookRestrictHash = [
    ...hookRestrict,
    ...hookHash,
];

export default {
    before: {
        all: [],
        find: hookAuth,
        get: hookRestrict,
        create: hookHash,
        update: hookRestrictHash,
        patch: hookRestrictHash,
        remove: hookRestrict,
    },

    after: {
        all: [],
        find: [],
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
