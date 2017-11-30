import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description Utility to parse GraphQL errors into compatible messages.
 * @param {GraphQLError} error - The error thrown by the graphl-handler..
 * @returns {Array} - The errors converted to messages.
 */
export function CatchErrorMessages (error) {
    let { graphqQLErrors: errors } = error;
    if (!errors || errors.length < 1)
        errors = [{ name: error.name, message: error.message }];
    return errors.map(message => ({ ...message, type: 'error' }));
}

export const Component = ({ messages }) =>
    Array.isArray(messages) &&
    messages.length > 0 &&
    <section>
        {messages.map(({ type, name, message }, i) => <figure key={ i } className={ type }>
            <strong>{ name }: </strong>
            <em>{ message }</em>
        </figure>)}
    </section>;

Component.propTypes = {
    messages: PropTypes
        .arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
        }))
        .isRequired,
};

Object.defineProperty(Component, 'name', { value: 'ComponentMessages' });
export default Component;
