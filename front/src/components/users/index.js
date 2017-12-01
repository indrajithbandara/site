import React from 'react';
import { graphql as WithApolloGraphql, compose as ApolloCompose } from 'react-apollo';
// Local
import Schema from './schema';
import ComponentMod from './component-mod';
import ComponentAdd from './component-add';
import { ComponentName } from './common';

Object.defineProperty(ComponentMod, 'name', { value: `${ComponentName}Mod` });
export const Mod = ApolloCompose(
    // Fetches users right at the beginnning
    WithApolloGraphql(Schema.query),
    // Allows to update users
    WithApolloGraphql(Schema.mutationMod, { name: 'mutationMod' }),
    // Allows to delete users
    WithApolloGraphql(Schema.mutationDel, { name: 'mutationDel' }),
)(ComponentMod);

Object.defineProperty(ComponentMod, 'name', { value: `${ComponentName}Add` });
export const Add = WithApolloGraphql(
    Schema.mutationAdd,
    { name: 'mutationAdd' },
)(ComponentAdd);


export default { Mod, Add };
