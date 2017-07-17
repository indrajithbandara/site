import React from 'react';
import ReactDOM from 'react-dom';
import CSS from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Home from './Home';

const Style = CSS.section`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 2rem;
    grid-template-areas:
        "header"
        "content"
        "footer";
`;

export default () => <Style>
    <Header/>
    <Switch>
        <Route exact path="/" component={Home}/>
    </Switch>
    <Footer/>
</Style>
