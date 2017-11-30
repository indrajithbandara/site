import React from 'react';
// Local
import ComponentMessages from 'components/messages';
import ComponentLoading from 'components/loading';
import { Mutate } from './common';

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

    handleUpdate = (event) => {
        event.preventDefault();
        return Mutate(this, event.target.dataset._id, 'mutationMod', {
            name: 'Success',
            type: 'info',
            message: `User ${event.target.dataset._id} was updated.`,
        });
    }

    handleDelete = (event) => {
        event.preventDefault();
        return Mutate(this, event.target.dataset._id, 'mutationDel', {
            name: 'Success',
            type: 'info',
            message: `User ${event.target.dataset._id} was deleted.`,
        });
    }
}

Object.defineProperty(Component, 'name', { value: 'ComponentUsersMod' });
export default Component;
