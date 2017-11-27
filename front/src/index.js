import URL from 'url'; // NodeJS
import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache as ApolloCache } from 'apollo-cache-inmemory';
import { split as ApolloLinkSplit } from 'apollo-link';
import { createHttpLink as ApolloLinkHttp } from 'apollo-link-http';
import { WebSocketLink as ApolloLinkSocket } from 'apollo-link-ws';
import { getMainDefinition as ApolloDefinition } from 'apollo-utilities';
import { BrowserRouter as Router } from 'react-router-dom';
// Local
import Config from '#config'; // eslint-disable-line import/no-unresolved
import Layout from 'layouts';

const cache = new ApolloCache();
// Determine which link to use depending on the operation being perfomed.
const link = ApolloLinkSplit(
    ({ query }) => {
        const { kind, operation } = ApolloDefinition(query);
        return kind === 'OperationDefinition' && operation === 'suscription';
    },
    new ApolloLinkSocket({
        uri: URL.format(Config.endpoints.socket),
        options: { reconnect: true },
    }),
    ApolloLinkHttp({ uri: URL.format(Config.endpoints.graphql) }),
);

ReactDOM.render(
    <ApolloProvider client={ new ApolloClient({ link, cache }) }>
        <Router>
            <Layout/>
        </Router>
    </ApolloProvider>,
    document.getElementsByTagName('main')[0],
);

