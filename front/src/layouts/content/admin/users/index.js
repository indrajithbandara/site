import React from 'react';
import GQL from 'graphql-tag';
import { graphql as WithApolloGraphql } from 'react-apollo';
// Local
import ComponentLoading from 'components/loading';

export const State = {
    users: [],
};

export const Schema = {
    query: GQL`query { users { _id, email, nameFirst, nameLast }}`,
};

export const Component = ({ data: { users } }) => !users
    ? <ComponentLoading/>
    : <table>
        <thead>
            <tr>
                <th>_id</th>
                <th>email</th>
                <th>nameFirst</th>
                <th>nameLast</th>
                <th>password</th>
            </tr>
        </thead>
        <tbody>
            {// eslint-disable-next-line
            users.map(({ _id, email, nameFirst, nameLast }) => <tr key={ _id }>
                <td>
                    <input
                        type="text"
                        name="_id"
                        readOnly={ true }
                        value={ _id }
                    />
                </td>
                <td>
                    <input
                        type="email"
                        name="email"
                        readOnly={ true }
                        value={ email }
                    />
                </td>
                <td>
                    <input
                        type="text"
                        name="nameFirst"
                        readOnly={ true }
                        value={ nameFirst || '' }
                    />
                </td>
                <td>
                    <input
                        type="text"
                        name="nameLast"
                        value={ nameLast || '' }
                    />
                </td>
                <td>
                    <input
                        type="password"
                        name="password"
                        readOnly={ true }
                        value=""
                    />
                </td>
            </tr>)}
        </tbody>
    </table>;

Object.defineProperty(Component, 'name', { value: 'LayoutContentAdminUsers' });
export default WithApolloGraphql(Schema.query)(Component);
