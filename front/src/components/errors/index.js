import React from 'react';
import PropTypes from 'prop-types';

export const Component = ({ errors }) =>
    Array.isArray(errors) &&
    errors.length > 0 &&
    <section>
        {errors.map((error, i) => <figure key={ i }>
            <strong>{error.name}: </strong>
            <em>{error.message}</em>
        </figure>)}
    </section>;

Component.propTypes = {
    errors: PropTypes
        .arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
        }))
        .isRequired,
};

Object.defineProperty(Component, 'name', { value: 'ComponentErrors' });
export default Component;
