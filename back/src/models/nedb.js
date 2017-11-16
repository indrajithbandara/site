// Node modules
import PATH from 'path';
// NPM modules
import NeDB from 'nedb';
import Checker from '@gik/tools-checker';
import Thrower from '@gik/tools-thrower';
// local modules
import { path as Path } from 'config';

export default function Model(name) {
    if (!Checker.is.string(name))
        Thrower(['Expecting a model name, got %s', typeof name], 'NeDBError');
    return new NeDB({
        filename: PATH.join(Path.data, `${name}.db`),
        autoload: true,
    });
}
