import React from 'react';
import PropTypes from 'prop-types';

import Item from './Item';

const List = props =>
    <section className="Todo-List">
        <ul>
            {props.todos.map(todo => <Item
                key={Math.round(Math.random()*9999)}
                {...todo}
            />)}
        </ul>
    </section>;

List.propTypes = {
    todos: PropTypes.array.isRequired
};

export default List;
