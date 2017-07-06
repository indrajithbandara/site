import React from 'react';
import PropTypes from 'prop-types';

const Item = props =>
    <li>
        <input
            type="checkbox"
            defaultChecked={props.isDone}
        />
        <span>{props.name}</span>
    </li>;

Item.propTypes = {
    isDone: PropTypes.bool,
    name: PropTypes.string.isRequired
};

export default Item;
