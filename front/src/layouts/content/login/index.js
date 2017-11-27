import React from 'react';
// Local
import ComponentLogin from 'components/login';

export const State = {
    user: null,
};

export class Component extends React.Component {

    state = State;

    render() {
        return <section>
            <h2>Acceso al portal administrador</h2>
            <ComponentLogin onLogin={ this.handleLogin }/>
        </section>;
    }

    handleLogin = (event, user) => {
        console.log(user);
    }
}

Object.defineProperty(Component, 'name', { value: 'LayoutLogin' });
export default Component;
