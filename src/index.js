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

// Template parts
import Header from './template/Header';
import Footer from './template/Footer';

// Routes
import Home from './routes/Home';
import Todo from './components/Todo';

// Render the application
ReactDOM.render(
    <Router>
        <main>
            <Header/>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/todo' component={Todo}/>
            </Switch>
            <Footer/>
        </main>
    </Router>,
    document.getElementById('root')
);

registerServiceWorker();
