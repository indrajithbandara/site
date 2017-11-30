import React from 'react';
import { graphql as WithApolloGraphql, compose as ApolloCompose } from 'react-apollo';
// Local
import Schema from './schema';
import Component from './component';

export default ApolloCompose(
    // Fetches users right at the beginnning
    WithApolloGraphql(Schema.query),
    // Allows to update users
    WithApolloGraphql(Schema.mutationMod, { name: 'mutationMod' }),
)(Component);
