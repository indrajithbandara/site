import React from 'react';
import PropTypes from 'prop-types';
import GQL from 'graphql-tag';
import { withApollo as WithApollo } from 'react-apollo';
// Local
import ComponentErrors from 'components/errors';
import ComponentLoading from 'components/loading';

export const Schema = {
    queryUser: GQL`query ($email: String!, $password: String! ) {
        user(email: $email, password: $password) {
            _id, token, email
        }
    }`,
};

export const State = {
    loading: false,
    errors: [],
    email: '',
    password: '',
};

export class Component extends React.Component {

    state = State;

    static propTypes = {
        onLogin: PropTypes.func.isRequired,
    };

    render() { return this.state.loading // eslint-disable-line brace-style
        ? <ComponentLoading />
        : <form onSubmit={ this.handleSubmit }>
            <section>
                <label>Username</label>
                <input
                    ref="email"
                    type="email"
                    name="email"
                    value={ this.state.email }
                    onChange={ this.handleChange }/>
            </section>
            <section>
                <label>Password</label>
                <input
                    ref="password"
                    type="password"
                    name="password"
                    value={ this.state.password }
                    onChange={ this.handleChange }/>
            </section>
            <ComponentErrors errors={ this.state.errors }/>
            <button
                type="submit"
                disabled={ !(this.state.email.length && this.state.password.length) }>
                Submit
            </button>
        </form>;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const { client: apollo, onLogin } = this.props;
        apollo
            .query({
                query: Schema.queryUser,
                variables: {
                    email: this.state.email,
                    password: this.state.password,
                },
            })
            .catch(error => ({ errors: error.graphQLErrors }))
            .then(({ errors, data }) => {
                if (errors) return this.setState({ ...State, errors });
                this.setState(State);
                return onLogin(event, Object
                    .keys(data.user)
                    .filter(key => key === '_id' || key.indexOf('_') === -1)
                    .reduce((acc, key) => ({ ...acc, [key]: data.user[key] }), {}),
                );
            });
        // prevent default
        return false;
    }

    handleChange = e => this.setState({
        [e.target.name]: e.target.value,
        errors: [],
    });
}

Object.defineProperty(Component, 'name', { value: 'ComponentLogin' });
export default WithApollo(Component);
