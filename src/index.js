import React from 'react';
import ReactDOM from 'react-dom';

// Enable make the app progressive (available offline)
import registerServiceWorker from './registerServiceWorker';

// The Router pieces needed to render
import {
    Switch,
    Route,
    BrowserRouter as Router
} from 'react-router-dom';

// Style management
import { ThemeProvider } from 'styled-components';
import Theme from './theme';

// Template parts
import Header from './template/Header';
import Footer from './template/Footer';

// Routes
import Home from './routes/Home';


// Render the application
ReactDOM.render(
    <ThemeProvider theme={Theme}>
        <Router>
            <main>
                <Header/>
                <Switch>
                    <Route exact path='/' component={Home}/>
                </Switch>
                <Footer/>
            </main>
        </Router>
    </ThemeProvider>,
    document.getElementById('root')
);

registerServiceWorker();
