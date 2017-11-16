import PATH from 'path';
import $ from '@gik/tools-streamer';
// Local modules
import Log from 'logger';

export default $
    .fromDirRead(__dirname)
    .filter(node => node.stat.isDirectory())
    .map(({ path }) => {
        const service = require(path).default; // eslint-disable-line global-require
        const name = PATH.basename(path);
        if (typeof service !== 'function')
            throw new Error(`Invalid ${name} service function, got ${typeof service}`);
        function wrappedService() {
            this.configure(service.bind(this, name));
            Log.info('Service registered: %s', name);
            return this;
        }
        // The function name will be the filename
        Object.defineProperty(wrappedService, 'name', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: name,
        });
        return wrappedService;
    })
    .toArray();
