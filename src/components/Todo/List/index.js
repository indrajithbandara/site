import React from 'react';
import PropTypes from 'prop-types';

import Item from './Item';

export default class List extends React.Component {

    static propTypes = {
        todos: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired
    };

    render = () => <section className="Todo-List">
        <ul>
            {this.props.todos.map(todo =>
                <Item key={todo.id} onChange={this.props.onChange} {...todo} />
            )}
        </ul>
    </section>;
}
