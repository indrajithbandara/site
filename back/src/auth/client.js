import FeathersClient from 'feathers-client';
import SuperAgent from 'superagent';
import Config from 'config';

/**
 * In order to not create a dependency on the Schema
 * the authentication step will be managed externally.
 */
export default FeathersClient()
    .configure(FeathersClient
        .rest(`http://${Config['server.host']}:${Config['server.port']}`)
        .superagent(SuperAgent),
    )
    .configure(FeathersClient.hooks())
    .configure(FeathersClient.authentication({
        path: Config['auth.path'],
        service: Config['auth.service'],
    }));
