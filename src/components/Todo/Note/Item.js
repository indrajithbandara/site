import React from 'react';
import PropTypes from 'prop-types';

const Item = props => <section>
    <span className={props.type}> {props.value}</span>
</section>;

Item.propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
};

export default Item;
