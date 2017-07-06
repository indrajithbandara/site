import React from 'react';
import PropTypes from 'prop-types';

const Form = props => <form onSubmit={props.onSubmit}>
    <input type="text" onChange={props.onChange} value={props.value} />
</form>;

Form.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default Form;
