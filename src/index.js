import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Front from './routes/Front';
import Back from './routes/Back';
import Theme from './theme';

// Render the application
ReactDOM.render(
    <ThemeProvider theme={Theme}>
        <Router>
            <Switch>
                <Route exact path="/admin" component={Back}/>
                <Route path="/" component={Front}/>
            </Switch>
        </Router>
    </ThemeProvider>,
    document.getElementsByTagName('main')[0]
);

// Enable make the app progressive (available offline)
registerServiceWorker();
