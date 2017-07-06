import React from 'react';
import PropTypes from 'prop-types';

export default class Form extends React.Component {

    static propTypes = {
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    handleChange = e => {
        this.props.onChange(e.target.value);
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.props.value);
    }

    render(){
        return <form onSubmit={this.handleSubmit}>
            <input
                type="text"
                onChange={this.handleChange}
                value={this.props.value}
            />
        </form>
    }
}
