// NPM modules
import Feathers from 'feathers';
import FeathersHooks from 'feathers-hooks';
import Cors from 'cors';
import Helmet from 'helmet';
import Compression from 'compression';
import BodyParser from 'body-parser';
import { $ } from '@gik/tools-streamer';
// Local modules
import Config from 'config';
import Log from 'logger';
import Services$ from 'services';

/**
 * @namespace Backend
 * @description The API that serves content to the frontend.
 */
const feathers$ = $
    .of(Feathers())
    .share();

// ------------------------------------------------------------------- Basic configuration
const feathersBase$ = feathers$.map(feathers => feathers
    // set configuration to server
    .configure(() => Object
        .keys(Config)
        .forEach(key => feathers.set(key, Config[key])))
    // Enable Cross Origin Resource Sharing
    .use(Cors())
    // Adds some security mesaurements (not bullet proof thoigh)
    .use(Helmet())
    // Enable gzip compression on responses.
    .use(Compression())
    // Allow the automatic parsing of JSON and query strings.
    .use(BodyParser.json())
    .use(BodyParser.urlencoded({ extended: true }))
    // Enable the static server on the public route
    .use('/', Feathers.static(Config['path.static'])),
);

// ------------------------------------------------------- Plugins, Providers & Middleware
const feathersProviders$ = feathers$.map(feathers => feathers
    .configure(FeathersHooks()),
);

const feathersServices$ = $
    .combineLatest(feathers$, Services$)
    .map(([feathers, services]) => feathers
        .get('services')
        .map((name) => {
            const service = services.filter(func => func.name === name).shift();
            if (!service) throw new Error(`Invalid service "${name}", not found.`);
            return feathers.configure(service);
        }),
    );

// ------------------------------------------------------------------------ Initialization
const onError = error => Log.error(error);
$
    .combineLatest(
        feathersBase$,
        feathersProviders$,
        feathersServices$,
        // feathersFallback$,
    )
    .switchMapTo(feathers$)
    .subscribe(
        feathers => feathers
            .set('server.port', process.env.PORT || feathers.get('server.port'))
            .set('server.host', process.env.HOST || feathers.get('server.host'))
            .listen(feathers.get('server.port'), feathers.get('server.host'))
            .on('listening', () => Log.info(
                'listening on %s:%d',
                feathers.get('server.host'),
                feathers.get('server.port'),
            ))
            .on('unhandledRejection', onError),
        onError,
    );
