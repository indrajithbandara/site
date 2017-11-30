import React from 'react';
// Local
import ComponentLoading from 'components/loading';
import ComponentMessages, { CatchErrorMessages } from 'components/messages';
import Schema from './schema';

/* TODO:
   - Implemente onDelete
*/

export const State = {
    users: null, // null when not loaded, array when loaded
    loading: null,
    messages: [],
};

export class Component extends React.Component {

    state = State;

    /**
     * @description Will be called everytime the apollo-client's store is updated.
     * @param {Object} data - The data received from the graphql server.
     */
    componentWillReceiveProps({ data: { users } }) {
        this.setState({ users });
    }

    render() {
        // Show onlu loader while waiting.
        if (this.state.loading || !this.state.users) return <ComponentLoading/>;
        // Data is ready to be shown.
        return <section>
            <ComponentMessages messages={ this.state.messages } />
            <header>
                <span>Email</span>
                <span>First Name</span>
                <span>Last Name</span>
                <span>Password</span>
                <span>Actions</span>
            </header>
            <footer>{this.state.users.map((user) => {
                const props = name => ({ // DRY
                    name,
                    'data-_id': user._id,
                    onChange: this.handleInput,
                    value: user[name] || '',
                });
                return <form
                    key={ user._id }
                    data-_id={ user._id }
                    onSubmit={ this.handleUpdate }
                    onReset={ this.handleDelete }>
                    <label>
                        <input type="email" required="true" { ...props('email') } />
                    </label>
                    <label>
                        <input type="text" { ...props('nameFirst') } />
                    </label>
                    <label>
                        <input type="text" { ...props('nameLast') } />
                    </label>
                    <label>
                        <input type="password" required="true" { ...props('password') }/>
                    </label>
                    <label>
                        <button type="submit">Update</button>
                        <button type="reset">Delete</button>
                    </label>
                </form>;
            })}</footer>
        </section>;
    }

    /**
     * @description Sets the value of element into corresponding property of user in state
     * @param {Object} event - The DOM event.
     */
    handleInput = ({ target: { name, value, dataset: { _id } } }) => {
        this.setState({
            ...State,
            users: this.state.users
                .map(user => user._id !== _id ? user : { ...user, [name]: value }),
        });
        return true;
    };

    /**
     * @description Triggers the mutation to update an user.
     * @param {Object} event - The Dom event.
     * @param {Function} event.preventDefault - Stop the usual behaviour (sending form).
     * @param {DOMElement} event.target - The form sending the event.
     */
    handleUpdate = (event) => {
        event.preventDefault();
        const { _id } = event.target.dataset;
        const variables = this.state.users
            .filter(user => user._id === _id)
            .shift();
        this.setState({ loading: true });
        this.props
            .mutationMod({
                variables,
                optimisticResponse: { userMod: variables },
                // Update the information on the store.
                // it will trigger componentWillReceiveProps with the latest changes.
                update(store, { data: { userMod: user } }) {
                    const data = store.readQuery({ query: Schema.query });
                    data.users.splice(data.users.indexOf(user._id), 1, user);
                    store.writeQuery({ query: Schema.query, data });
                },
            })
            .catch(error => ({ messages: CatchErrorMessages(error) }))
            .then(({ messages }) => this.setState({
                loading: false,
                messages: messages || [{
                    name: 'Sucess',
                    type: 'info',
                    message: 'User modified.',
                }],
            }));
        return false;
    }

}

Object.defineProperty(Component, 'name', { value: 'ComponentUsersMod' });
export default Component;
