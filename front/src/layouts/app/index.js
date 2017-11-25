import React from 'react';
import { Route, Switch as RouteSwitch } from 'react-router-dom';
// Local
import ComponentHeader from 'components/header';
import ComponentFooter from 'components/footer';
import ComponentLogin from 'components/login';
import ComponentAboutMe from 'components/aboutme';

export default () => <section>
    <ComponentHeader/>
    <RouteSwitch>
        <Route exact={ true } path="/" component={ ComponentAboutMe } />
        <Route exact={ true } path="/login" component={ ComponentLogin } />
    </RouteSwitch>
    <ComponentFooter/>
</section>;
