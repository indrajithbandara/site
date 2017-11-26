import URL from 'url';
import FeathersClient from 'feathers-client';
import SuperAgent from 'superagent';
import { Back as Config } from 'config';

/**
 * In order to not create a dependency on the Schema
 * the authentication step will be managed externally.
 * effectivelly creating an independendt call.
 */
export default FeathersClient()
    .configure(FeathersClient
        .rest(URL.format(Config.endpoints.auth))
        .superagent(SuperAgent),
    )
    .configure(FeathersClient.hooks())
    .configure(FeathersClient.authentication({
        path: Config.auth.path,
        service: Config.auth.service,
    }));
