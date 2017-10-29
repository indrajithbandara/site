// NPM modules
import FeathersNeDB from 'feathers-nedb';
// Local modules
import ModelNeDB from 'models/nedb';
import Hooks from './hooks';

export default function ServiceSocket() {
    const name = 'socket';
    // register the service
    this.use(`/${name}`, FeathersNeDB({ name, Model: ModelNeDB(`${name}.db`) }));
    // initialize the service
    const service = this.service(name);
    service.hooks(Hooks);
}
