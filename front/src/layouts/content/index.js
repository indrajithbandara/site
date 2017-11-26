import React from 'react';
import { Route, Switch as RouteSwitch } from 'react-router-dom';
// Local
import LayoutContentHome from 'layouts/content/home';
import LayoutContentLogin from 'layouts/content/login';
import LayoutContentAboutMe from 'layouts/content/aboutme';

export const Component = () => <RouteSwitch>
    <Route exact={ true } path="/" component={ LayoutContentHome } />
    <Route exact={ true } path="/about" component={ LayoutContentAboutMe } />
    <Route exact={ true } path="/login" component={ LayoutContentLogin } />
</RouteSwitch>;

Object.defineProperty(Component, 'name', { value: 'LayoutContent' });
export default Component;
