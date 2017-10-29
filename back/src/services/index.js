// NPM modules
import $ from '@gik/tools-streamer';
// Local modules
import Log from 'logger';

export default $
    .fromDirRead(__dirname)
    .filter(node => node.stat.isDirectory())
    .map(({ path }) => require(path).default) // eslint-disable-line global-require
    .map(service => function wrapService() {
        this.configure(service);
        Log.debug('Registered service %s', service.name);
    });
