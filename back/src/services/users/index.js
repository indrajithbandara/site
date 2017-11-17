// NPM modules
import ServiceNeDB from 'feathers-nedb';
// Local modules
import ModelNeDB from 'models/nedb';
import Hooks from './hooks';

export default function Service(name) {

    this.use(`/${name}`, ServiceNeDB({
        name,
        Model: ModelNeDB(name),
    }));

    const service = this.service(name);
    service.hooks(Hooks);
}
