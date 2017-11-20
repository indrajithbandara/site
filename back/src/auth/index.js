/* eslint-disable global-require */
import PATH from 'path';
// NPM modules
import FeathersAuth from 'feathers-authentication';
import FeathersAuthJWT from 'feathers-authentication-jwt';
import FeathersAuthLocal from 'feathers-authentication-local';
import DeepMerge from 'deepmerge';
import Thrower from '@gik/tools-thrower';
import { $ } from '@gik/tools-streamer';
// Local
import { Raw as Config, Path } from 'config';
import Log from 'logger';

const secret = PATH.join(Path.cfg, 'back-auth.json');
export default $
    .fromAccess(secret)
    .map((access) => {
        if (!access) Thrower(['Expecting a secret file on %s', secret], 'AuthSecretError');
        const strategies = ['jwt', 'local'];
        const config = DeepMerge({ ...Config.auth, strategies }, require(access));
        return function Authentication() {
            this
                .configure(FeathersAuth(config))
                .configure(FeathersAuthJWT())
                .configure(FeathersAuthLocal())
                .service('auth')
                .hooks({
                    before: {
                        create: [
                            FeathersAuth.hooks.authenticate(strategies),
                        ],
                        remove: [
                            FeathersAuth.hooks.authenticate('jwt'),
                        ],
                    },
                });
            Log.debug('Auth', config);
        };
    });
