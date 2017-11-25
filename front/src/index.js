import URL from 'url'; // NodeJS
import { InMemoryCache as ApolloCache } from 'apollo-cache-inmemory';
import { split as ApolloSplitLink } from 'apollo-link';
import { getMainDefinition as ApolloDefinition } from 'apollo-utilities';
import { createHttpLink as ApolloLink } from 'apollo-link-http';
import { WebSocketLink as ApolloSocket } from 'apollo-link-ws';
import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';

// Local
import Config from '#config'; // eslint-disable-line import/no-unresolved
import App from 'layouts/app';

const cache = new ApolloCache();
const link = ApolloSplitLink(
    ({ query }) => {
        const { kind, operation } = ApolloDefinition(query);
        return kind === 'OperationDefinition' && operation === 'suscription';
    },
    // linkHttp
    ApolloLink({ uri: URL.format(Config.endpoints.graphql) }),
    // linkSubscription
    new ApolloSocket({
        uri: URL.format(Config.endpoints.socket),
        options: { reconnect: true },
    }),
);

ReactDOM.render(
    <ApolloProvider client={ new ApolloClient({ link, cache }) }>
        <Router>
            <App/>
        </Router>
    </ApolloProvider>,
    document.getElementsByTagName('main')[0],
);

