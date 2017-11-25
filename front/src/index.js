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
// import App from 'layouts/App';

const cache = new ApolloCache(); // eslint-disable-line
const link = ApolloSplitLink( // eslint-disable-line
    ({ query }) => {
        const { kind, operation } = ApolloDefinition(query);
        return kind === 'OperationDefinition' && operation === 'suscription';
    },
    // linkHttp
    ApolloLink({ uri: URL.format(Config.graphql.url) }),
    // linkSubscription
    new ApolloSocket({
        uri: URL.format(Config.suscription.url),
        options: { reconnect: true },
    }),
);

ReactDOM.render(
    <ApolloProvider client={ new ApolloClient({ link, cache }) }>
        <Router>
            <h1>Hello world</h1>
        </Router>
    </ApolloProvider>,
    document.getElementsByTagName('main')[0],
);

