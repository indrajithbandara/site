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
import ConfigFlat from './config';
import Log from './logger';
import Hooks from './hooks';
import GraphQL from './graphql';
import Auth$ from './auth';
import Services$ from './services';

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
            .keys(ConfigFlat)
            .forEach(key => feathers.set(key, ConfigFlat[key])))
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
        .use('/', Feathers.static(ConfigFlat['path.static'])),
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

const feathersGraphQL$ = feathers$
    .do(feathers => feathers.configure(GraphQL))
    .mapTo('GraphQL');

const feathersFallback$ = feathers$
    .do(feathers => feathers
        .use(FeathersErrorNotFound())
        .use(FeathersErrorHandler()),
    )
    .mapTo('Fallback');


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
        feathersGraphQL$,
        feathersFallback$,
        feathersHooks$,
    )
    .do(name => Log.info(`${name} registered.`))
    .toArray()
    .switchMapTo(feathers$)
    .subscribe(
        feathers => feathers
            .listen(
                feathers.get('ports.back'),
                feathers.get('hosts.back'),
            )
            .on('listening', () => Log.info(
                '[back] %s:%d',
                feathers.get('hosts.back'),
                feathers.get('ports.back'),
            ))
            .on('unhandledRejection', onError),
        onError,
    );
