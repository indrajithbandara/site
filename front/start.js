/* globals process */
/* eslint-disable import/no-dynamic-require */

import PATH from 'path';
import { inspect as INSPECT } from 'util';
import WebpackServer from 'webpack-dev-server';
import WebpackMerge from 'webpack-merge';
import Webpack from 'webpack';
import Logger from '@gik/tools-logger';
import { Is } from '@gik/tools-checker';
import { Env, Path, Configurator } from '@gik/tools-configurator';

const log = Logger({ name: 'webpack' });
const error = (message) => {
    process.stderr.write(`\n${message}\n`);
    process.exit(1);
};

const Front = Configurator({ path: Path.cfg, name: ['common', 'front'] });

const Config = ['webpack', `webpack-${Env}`]
    .reduce((config, name) => {
        const mod = require(PATH.join(Path.etc, name));
        if (!Is.function(mod.default)) error(`Invalid ${name}: Expecting function`);
        return {
            ...config,
            webpack: WebpackMerge(config.webpack, mod.default(config)),
        };
    }, {
        ...Front,
        path: Path,
        env: Env,
        webpack: {},
    });

log.debug('config\n', INSPECT(Config.webpack, { colors: true, depth: null }));
const webpack = Webpack(Config.webpack);

if (Env === 'production') {
    webpack.run((err, stats) => {
        const out = ['\n', stats.toString({ colors: true, chunks: false }), '\n'].join('');
        if (err) error(err.message);
        if (stats.hasErrors()) error(out);
        process.stdout.write(out);
    });
} else {
    const ConfigServer = require(PATH.join(Path.etc, 'webpack-server')).default(Config);
    const { host, port } = ConfigServer;
    log.debug('devServer\n', INSPECT(ConfigServer, { colors: true, depth: null }));
    const server = new WebpackServer(webpack, ConfigServer);
    server.listen(port, host, () => {
        process.stdout.write('\n\n');
        log.info('Listening %s:%s', host, port);
        process.stdout.write('\n');
    });
}
