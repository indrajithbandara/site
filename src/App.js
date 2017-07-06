import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

import Todo from './components/Todo';

export default class App extends Component {

    render() {
        return <section className="App">

            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>React Todos!</h2>
            </header>

            <Todo/>

        </section>;
    }

};
