// NPM modules
import $ from '@gik/tools-streamer';
// Local modules
import Log from 'logger';

export default $
    .fromDirRead(__dirname)
    .filter(node => node.stat.isDirectory())
    .map(({ path }) => require(path).default) // eslint-disable-line global-require
    .map(service => function wrappedService() {
        this.configure(service);
        Log.info('Registered service %s', service.name);
        return this;
    });
