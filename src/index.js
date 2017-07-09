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
import {
    ThemeProvider,
    injectGlobal as Style
} from 'styled-components';
import Theme from './theme';

// Template parts
import Header from './template/Header';
import Footer from './template/Footer';

// Routes
import Home from './routes/Home';


// Layout template
Style`
    app {
        height: 100vh;
        width: 100vw;
        display:grid;
        grid-template-columns: 1fr;
        grid-template-rows: 3rem 1fr 2rem;
        grid-template-areas: "header" "content" "footer";
        justify-items: stretch;
        align-items: stretch;
    }
`
// Render the application
ReactDOM.render(
    <ThemeProvider theme={Theme}>
        <Router>
            <app>
                <Header/>
                <Switch>
                    <Route exact path='/' component={Home}/>
                </Switch>
                <Footer/>
            </app>
        </Router>
    </ThemeProvider>,
    document.getElementsByTagName('main')[0]
);

registerServiceWorker();
