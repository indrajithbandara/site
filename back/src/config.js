/* eslint-disable global-require */

// Native modules
import PATH from 'path';
// NPM moduless
import ToolPopulator from '@gik/tools-populator';
import ToolMapper from '@gik/tools-mapper';
import { sync as PkgDir } from 'pkg-dir';

/**
 * @memberof Backend.Configuration
 * @type Object
 * @export
 * @description The location for all relevant folders in the project.
 * These are set on `package.json` under the `directories` property. **Note** that the
 * `out` and `src` folderd are replaced with the `app` property to avoid confusions.
 *
 * @property {string} root - Project's root folder.
 * @property {string} cfg - Project's config folder.
 * @property {string} app - Project's application root.
 */
export const path = Object
    .keys(process.env)
    .filter(key => key.indexOf('npm_package_directories_') === 0)
    .reduce((acc, key) => ({
        ...acc,
        [key.replace('npm_package_directories_', '')]: PATH.resolve(process.env[key]),
    }), {
        root: PkgDir(__dirname),
    });
path.app = path.out;
delete path.src;
delete path.out;

/**
 * @memberof Backend.Configuration
 * @type Object
 * @description The raw contents for the `back.json` file on `cfg` folder.
 *
 * ###### `back.json`
 * ```javascript
 * <<<file:root/../config/back.json>>>
 * ```
 */
export const raw = require(PATH.join(path.cfg, 'back.json'));

/**
 * @memberof Backend.Configuration
 * @type Object
 * @description The raw contents for the `package.json` file on `root` folder.
 */
export const pkg = require(PATH.join(path.root, 'package.json'));

/**
 * module Configuration
 * @memberof Backend
 * @description The properties that control backend's behaviour.
 * It's important to note that this object has been flattened for easier access and all
 * the properties are setup into feathers /(express) server.
 *
 * @property {Object} path - A reference to [path](#Backend.Configuration.path)
 * @property {Object} pkg - A reference to [pkg](#Backend.Configuration.pkg)
 */
export default ToolMapper(ToolPopulator({
    ...raw,
    path,
    pkg,
}));
