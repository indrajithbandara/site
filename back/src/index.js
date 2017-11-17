/* eslint-disable */
// NPM modules
import Feathers from 'feathers';
import FeathersHooks from 'feathers-hooks';
import FeathersRest from 'feathers-rest';
import FeathersErrorHandler from 'feathers-errors/handler';
import FeathersErrorNotFound from 'feathers-errors/not-found';
import Cors from 'cors';
import Helmet from 'helmet';
import Compression from 'compression';
import BodyParser from 'body-parser';
import { $ } from '@gik/tools-streamer';
// Local modules
import Config from 'config';
import Log from 'logger';
import Hooks from 'hooks';
import Auth$ from 'auth';
import Services$ from 'services';

/**
 * @namespace Backend
 * @description The API that serves content to the frontend.
 */
const feathers$ = $
    .of(Feathers())
    .share();

// ------------------------------------------------------------------- Basic configuration
const feathersBase$ = feathers$
    .do(feathers => feathers
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
    )
    .mapTo('Base');

// ------------------------------------------------------- Plugins, Providers & Middleware
const feathersProviders$ = feathers$
    .map(feathers => feathers
        .configure(FeathersHooks())
        .configure(FeathersRest()),
    )
    .mapTo('Providers');

const feathersAuth$ = $
    .combineLatest(feathers$, Auth$)
    .do(([feathers, auth]) => feathers.configure(auth))
    .mapTo('Auth');

const feathersServices$ = $
    .combineLatest(feathers$, Services$)
    .do(([feathers, services]) => feathers
        .get('services')
        .map((name) => {
            const service = services.filter(func => func.name === name).shift();
            if (!service) throw new Error(`Invalid service "${name}", not found.`);
            return feathers.configure(service);
        }),
    )
    .mapTo('Services');


const feathersFallback$ = feathers$
    .do(feathers => feathers
        .use(FeathersErrorNotFound())
        .use(FeathersErrorHandler()),
    )
    .mapTo('Fallback')


const feathersHooks$ = feathers$
    .do(feathers => feathers.hooks(Hooks))
    .mapTo('Hooks');

// ------------------------------------------------------------------------ Initialization
const onError = error => Log.error(error);
$
    .concat(
        feathersBase$,
        feathersProviders$,
        feathersAuth$,
        feathersServices$,
        feathersFallback$,
        feathersHooks$,
    )
    .do(name => Log.info(`${name} registered.`))
    .toArray()
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
