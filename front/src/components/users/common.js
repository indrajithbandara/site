import { CatchErrorMessages } from 'components/messages';
// Local
import Schema from './schema';

export const ComponentName = 'ComponentUsers';

/**
 * @description Triggers the mutation to update an user.
 * @param {Function} mutation - The mutation function, obtained from component's props.
 * @param {Object} variables - The payload sent to the mutation.
 */
export const Mutate = (mutation, variables) => mutation({
    variables,
    // Populate the variables with the corresponding user
    // Once done the mutation fetch the Query again.
    // Updating the store is preferred and optimal, but I'm using component for:
    // a) simplicity b) future reference.
    refetchQueries: [{ query: Schema.query }],
}).catch(error => ({ errors: CatchErrorMessages(error) }));

export default {
    mutate: Mutate,
};
