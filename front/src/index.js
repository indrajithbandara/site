import URL from 'url'; // NodeJS
import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache as ApolloCache } from 'apollo-cache-inmemory';
import { split as ApolloLinkSplit, ApolloLink } from 'apollo-link';
import { createHttpLink as ApolloLinkHttp } from 'apollo-link-http';
import { WebSocketLink as ApolloLinkSocket } from 'apollo-link-ws';
import { getMainDefinition as ApolloDefinition } from 'apollo-utilities';
import { BrowserRouter as Router } from 'react-router-dom';
// Local
import Config from '#config'; // eslint-disable-line import/no-unresolved
import Layout from 'layouts';

// eslint-disable-next-line no-underscore-dangle
const cache = new ApolloCache().restore(window.__APOLLO_STATE__);
const link = ApolloLinkSplit(
    // When the operation is a subscription:
    // use the socket link (2nd arg), otherwise use http (3rd arg)
    ({ query }) => {
        const { kind, operation } = ApolloDefinition(query);
        return kind === 'OperationDefinition' && operation === 'suscription';
    },
    // Setup the socket link for subscriptions.
    new ApolloLinkSocket({
        uri: URL.format(Config.endpoints.socket),
        options: { reconnect: true },
    }),
    // Create a middleware to send token whenever is available on every http link op.
    new ApolloLink((operation, forward) => {
        operation.setContext({
            headers: {
                token: localStorage.getItem('user.token') || null,
            },
        });
        return forward(operation);
    }).concat(ApolloLinkHttp({ uri: URL.format(Config.endpoints.graphql) })),
);

ReactDOM.render(
    <ApolloProvider client={ new ApolloClient({ link, cache }) }>
        <Router>
            <Layout/>
        </Router>
    </ApolloProvider>,
    document.getElementsByTagName('main')[0],
);
