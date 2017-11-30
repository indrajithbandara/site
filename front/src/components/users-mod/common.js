/* eslint-disable */
import { CatchErrorMessages } from 'components/messages';
import Schema from './schema';

/**
 * @description Triggers the mutation to update an user.
 * @param {instanceof React.Component} component - The instance of the current component.
 * @param {string} _id - The Dom event the element calling this function must have
 * a `data-_id` attribute specifying the user's id to be mutated.
 * @param {string} mutation - The mutation name. (has to exist on Schema)
 * @param {Object} message - The message object sent to ComponentMessages on success.
 */
export function Mutate(component, _id, mutation, message) {
    component.setState({ loading: true });
    component
        .props[mutation]({
            // Populate the variables with the corresponding user
            variables: component.state.users.find(user => user._id === _id),
            // Once done the mutation fetch the Query again.
            // Updating the store is preferred and optimal, but I'm using component for:
            // a) simplicity b) future reference.
            refetchQueries: [{ query: Schema.query }],
        })
        .catch(error => ({ messages: CatchErrorMessages(error) }))
        .then(({ messages }) => component.setState({
            loading: false,
            messages: messages || [message],
        }));
    return false; // prevents default
}

export default {
    mutate: Mutate,
};
