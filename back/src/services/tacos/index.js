// NPM modules
import ServiceNeDB from 'feathers-nedb';
// Local modules
import ModelNeDB from 'models/nedb';
import Hooks from './hooks';

export default function Service(name) {
    // register the service
    this.use(`/${name}`, ServiceNeDB({
        name,
        Model: ModelNeDB(name),
    }));
    // initialize the service
    const service = this.service(name);
    service.hooks(Hooks);
}
