import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// Local
import { List as ComponentList, Edit as ComponentEdit } from 'components/posts';

export const Component = ({ match: { params: { _id } } }) => <React.Fragment>
    <h2>
        <RouterLink to="/admin/posts">Artículos</RouterLink>
    </h2>
    { _id
        ? <ComponentEdit _id={ _id }/>
        : <ComponentList/>
    }
</React.Fragment>;

export default Component;
