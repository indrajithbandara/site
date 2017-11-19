/* globals process */
/* eslint-disable import/no-dynamic-require */

import PATH from 'path';
import FS from 'fs';
import { inspect as INSPECT } from 'util';
import WebpackServer from 'webpack-dev-server';
import WebpackMerge from 'webpack-merge';
import DeepMerge from 'deepmerge';
import Logger from '@gik/tools-logger';
import { Is } from '@gik/tools-checker';
import Webpack from 'webpack';

const log = Logger({ name: 'webpack' });
const error = (message) => {
    process.stderr.write(`\n${message}\n`);
    process.exit(1);
};

// Populated with the resolved directories declared con package.json
const path = Object
    .keys(process.env)
    .filter(key => key.indexOf('npm_package_directories_') === 0)
    .reduce((acc, key) => {
        const val = PATH.resolve(process.env[key]);
        if (!FS.existsSync(val)) error(`Invalid path: Cannot find module ${val}\n`);
        return {
            ...acc,
            [key.replace('npm_package_directories_', '')]: val,
        };
    }, {
        root: process.cwd(),
    });

// Populated with static configuration.
let config;
try {
    const base = 'front';
    const env = process.env.NODE_ENV || 'development';
    const cfgBse = require(PATH.join(path.cfg, `${base}.json`));
    const cfgEnv = require(PATH.join(path.cfg, `${base}-${env}.json`));
    if (!Is.object(cfgBse) || !Is.object(cfgEnv)) throw new Error('Expecting an object');
    config = DeepMerge.all([cfgBse, cfgEnv, { env, path }]);
} catch (err) {
    error(`Invalid config: ${err.message}\n`);
}

try {
    const base = 'webpack';
    let cfg = [`${base}`, `${base}-${config.env}`];
    if (config.env !== 'production') cfg.push(`${base}-server`);
    cfg = cfg.reduce((acc, name) => {
        let mod;
        const title = `Invalid ${name}: `;
        try {
            mod = require(PATH.join(path.etc, name));
        } catch (e) {
            error(title + e.message);
        }
        if (!Is.function(mod.default)) error(`${title}Expecting default function`);
        return { ...acc, [name]: mod.default };
    }, {});
    config.webpack = cfg[base](config);
    config.webpack = WebpackMerge(config.webpack, cfg[`${base}-${config.env}`](config));
    if (config.env !== 'production') config.devServer = cfg[`${base}-server`](config);
} catch (e) {
    error(e.message);
}

log.debug('config\n', INSPECT(config.webpack, { colors: true, depth: null }));
const webpack = Webpack(config.webpack);

if (config.env === 'production') {
    webpack.run((err, stats) => {
        const out = ['\n', stats.toString({ colors: true, chunks: false }), '\n'].join('');
        if (err) error(err.message);
        if (stats.hasErrors()) error(out);
        process.stdout.write(out);
    });
} else {
    const { host, port } = config.devServer;
    log.debug('devServer\n', INSPECT(config.devServer, { colors: true, depth: null }));
    const server = new WebpackServer(webpack, config.devServer);
    server.listen(port, host, () => {
        process.stdout.write('\n\n');
        log.info('Listening %s:%s', host, port);
        process.stdout.write('\n');
    });
}
