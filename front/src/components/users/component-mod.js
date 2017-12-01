import React from 'react';
// Local
import ComponentMessages from 'components/messages';
import ComponentLoading from 'components/loading';
import ComponentHeader from './component-header';
import ComponentFooter from './component-footer';
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
            <ComponentHeader/>
            <ComponentFooter
                labelSubmit = "Update"
                labelReset = "Delete"
                users={ this.state.users }
                onChange={ this.handleInput }
                onSubmit={ this.handleUpdate }
                onReset={ this.handleDelete}
            />
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

export default Component;
