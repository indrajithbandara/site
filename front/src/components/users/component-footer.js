import React from 'react';
import PropTypes from 'prop-types';
import { ComponentName } from './common';

export const Component = (props) => {

    const {
        users,
        labelSubmit,
        onSubmit,
        labelReset,
        onReset,
        onChange,
    } = props;

    return <footer>
        {users.map((user) => {

            const common = name => ({ // DRY
                name,
                onChange,
                'data-_id': user._id,
                value: user[name] || '',
            });

            return <form
                key={ user._id }
                data-_id={ user._id }
                onSubmit={ onSubmit }
                onReset={ onReset }>
                <label>
                    <input type="email" required="true" { ...common('email') } />
                </label>
                <label>
                    <input type="text" { ...common('nameFirst') } />
                </label>
                <label>
                    <input type="text" { ...common('nameLast') } />
                </label>
                <label>
                    <input type="password" required="true" { ...common('password') }/>
                </label>
                <label>
                    <button type="submit">{ labelSubmit }</button>
                    { labelReset && <button type="reset">{ labelReset }</button> }
                </label>
            </form>;
        })}
    </footer>;
};

Component.PropTypes = {
    users: PropTypes
        .arrayOf(PropTypes.shape({
            email: PropTypes.string.isRequired,
            nameFirst: PropTypes.string,
            nameLast: PropTypes.string,
            password: PropTypes.string.isRequired,
        }))
        .isRequired,
    labelSubmit: PropTypes.string.isRequired,
    labelReset: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onReset: PropTypes.func,
    onChange: PropTypes.func.isRequired,
};

Object.defineProperty(Component, 'name', { value: `${ComponentName}Footer` });
export default Component;

