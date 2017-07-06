import React from 'react';
import PropTypes from 'prop-types';

export default class Item extends React.Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        isDone: PropTypes.bool,
        onChange: PropTypes.func.isRequired
    };

    /**
     * The user clicked the checkbox.
     * Call the corresponding handler with the ID
     */
    handleChange = e => this.props.onChange(this.props.id);

    render = () => <li>
        <input
            type="checkbox"
            checked={this.props.isDone}
            onChange={this.handleChange.bind(this)}
        />
        <span>{this.props.name}</span>
    </li>;
}
