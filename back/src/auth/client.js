import URL from 'url';
import FeathersClient from 'feathers-client';
import SuperAgent from 'superagent';
import Thrower from '@gik/tools-thrower';
// Local
import { Back as Config, Env } from 'config';

/**
 * In order to not create a dependency on the Schema
 * the authentication step will be managed externally.
 * effectivelly creating an independendt call.
 */
export const AuthClient = FeathersClient()
    .configure(FeathersClient
        .rest(URL.format(Config.endpoints.auth))
        .superagent(SuperAgent),
    )
    .configure(FeathersClient.hooks())
    .configure(FeathersClient.authentication({
        path: Config.auth.path,
        service: Config.auth.service,
    }));

/**
 * @description Calls the auth endpoint to determine if given token is valid.
 * @param {string} token - The token to check.
 * @returns {Promise} - Contains the response from the auth endpoint.
 * @throws {AuthError} - An error wrapper to send as response to the client.
 *
 * TODO: validate user as well as token.
 */
export const TokenValidate = token => Env === 'development'
    ? new Promise(resolve => resolve({})) // NOTE: on development token is not  verified.
    : AuthClient.passport
        .verifyJWT(token)
        .catch(() => Thrower('Invalid token', 'AuthError'));


export default AuthClient;
