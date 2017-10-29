// NPM modules
import Feathers from 'feathers';
import FeathersHandler from 'feathers-errors/handler';
import FeathersNotFound from 'feathers-errors/not-found';
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
 * @description The API that serves content to the forntend.
 */
const feathers = Feathers();

// ------------------------------------------------------------------- Basic configuration
const feathersBasic$ = $.of(feathers
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
const feathersProviders$ = $.of(feathers
    .configure(FeathersHooks()),
    // .configure(FeathersSocket()),
);

const feathersServices$ = Services$
    .map(servicesWrapper => feathers.configure(servicesWrapper));

// if nothing else matches, this middleware will send a 404.
const feathersFallback$ = $.of(feathers
    .use(FeathersNotFound())
    .use(FeathersHandler()),
);

// ------------------------------------------------------------------------ Initialization
const port = process.env.PORT || feathers.get('server.port');
const host = process.env.HOST || feathers.get('server.host');
const onError = error => Log.error(error);
const onReady = () => Log.info('Listening on %s:%d', host, port);
$
    .combineLatest(
        feathersBasic$,
        feathersProviders$,
        feathersServices$,
        feathersFallback$,
    )
    .subscribe(
        () => feathers
            .listen(port, host)
            .on('listening', onReady)
            .on('unhandledRejection', onError),
        onError,
    );
