import React from 'react';
import PropTypes from 'prop-types';

export default class Item extends React.Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        isDone: PropTypes.bool,
        onChange: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired
    };

    /**
     * The user clicked the checkbox.
     */
    handleChange(e) {
        this.props.onChange(this.props.id);
    }

    /**
     * The user clicked the delete button
     */
    handleDelete(e) {
        this.props.onDelete(this.props.id);
    }

    render = () => <li className="Todo-List-Item">
        <pre onClick={this.handleDelete.bind(this)}>X</pre>
        <input
            type="checkbox"
            checked={this.props.isDone}
            onChange={this.handleChange.bind(this)}
        />
        <span>{this.props.name}</span>
    </li>;
}
