import React from 'react';
// Local
import ComponentLoading from 'components/loading';
import ComponentMessages from 'components/messages';
import ComponentHeader from './component-header';
import ComponentFooter from './component-footer';
import { Mutate } from './common';

export const State = {
    loading: null,
    active: false,
    messages: [],
    user: {
        email: '',
        nameFirst: '',
        nameLast: '',
        password: '',
    },
};

export class Component extends React.Component {

    state = State;

    /* eslint-disable indent, no-multi-spaces */
    render() {
        if (this.state.loading) return <ComponentLoading/>;
        return !this.state.active
        ?   <section>
                <ComponentMessages messages={ this.state.messages }/>
                <button onClick={ this.handleToggle }>Agregar</button>
            </section>
        :   <section>
                <ComponentHeader/>
                <ComponentFooter
                    labelSubmit="Agregar"
                    labelReset="Cancelar"
                    users={ [{ ...this.state.user, _id: 0 }] }
                    onChange={ this.handleInput }
                    onSubmit={ this.handleAdd }
                    onReset={ this.handleCancel }
                />
            </section>;
    }
    /* eslint-enable indent, no-multi-spaces */

    handleInput = ({ target: { name, value } }) => this.setState({
        ...State,
        active: true,
        user: { ...this.state.user, [name]: value },
    });

    handleToggle = () => this.setState({ active: !this.state.active });

    handleCancel = () => this.setState(State);

    handleAdd = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        Mutate(this.props.mutationAdd, this.state.user)
            .then(({ errors }) => this.setState({
                ...State,
                loading: false,
                messages: errors || [
                    { name: 'Success', type: 'info', message: 'User created.' },
                ],
            }));
        return false;
    };
}

export default Component;
