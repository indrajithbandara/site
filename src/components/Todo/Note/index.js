import React from 'react';
import PropTypes from 'prop-types';

import Item from './Item';

const Note = props => <section>
    {props.notes.map(item => <Item
        key={Math.round(Math.random()*9999)}
        {...item}
    />)}
</section>;

Note.propTypes = {
    notes: PropTypes.array.isRequired
};

export default Note;
