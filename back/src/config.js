/* eslint-disable global-require */
import PATH from 'path';
import ToolPopulator from '@gik/tools-populator';
import ToolMapper from '@gik/tools-mapper';
import {
    Path as ConfiguratorPath,
    Env as ConfiguratorEnv,
    Configurator,
} from '@gik/tools-configurator';

// Expose available folders (removing src & out in favor of app)
export const Path = Object.assign({}, ConfiguratorPath);
Path.app = Path.out;
delete Path.src;
delete Path.out;

// The current environment (development when undefined)
export const Env = ConfiguratorEnv;

// The raw backend configuration.
export const Back = Configurator({ path: Path.cfg, name: ['common', 'back'] });

// The frontend configuration.
export const Front = Configurator({ path: Path.cfg, name: ['common', 'front'] });

// Include the package configuration
export const Package = require(PATH.join(Path.root, 'package.json'));

/**
 * module Configuration
 * @memberof Backend
 * @description The properties that control backend's behaviour.
 * It's important to note that this object has been flattened for easier access and all
 * the properties are setup into feathers /(express) server.
 *
 * @property {Object} path
 * @property {Object} pkg
 */
export default ToolMapper(ToolPopulator({
    ...Back,
    path: Path,
    package: Package,
    env: Env,
    front: Front,
}));
