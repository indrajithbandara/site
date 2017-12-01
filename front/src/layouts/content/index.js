import React from 'react';
import { Route, Switch as RouterSwitch } from 'react-router-dom';
// Local
import LayoutContentHome from 'layouts/content/home';
import LayoutContentLogin from 'layouts/content/login';
import LayoutContentAboutMe from 'layouts/content/aboutme';
import LayoutContentAdmin from 'layouts/content/admin';

export const Component = () => <RouterSwitch>
    <Route exact={ true } path="/" component={ LayoutContentHome } />
    <Route exact={ true } path="/about" component={ LayoutContentAboutMe } />
    <Route exact={ true } path="/login" component={ LayoutContentLogin } />
    <Route
        path="/admin"
        render={() => localStorage.getItem('user.token') !== null
            ? <LayoutContentAdmin/>
            : <LayoutContentLogin/>
        }
    />
</RouterSwitch>;

Object.defineProperty(Component, 'name', { value: 'LayoutContent' });
export default Component;
