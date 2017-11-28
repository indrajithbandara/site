import React from 'react';
import { Route, Switch as RouteSwitch } from 'react-router-dom';
// Local
import LayoutContentAdminHome from 'layouts/content/admin/home';
import LayoutContentAdminUsers from 'layouts/content/admin/users'

export const Component = () => <section>
    <h2>Administrador</h2>
    <RouteSwitch>
        <Route exact={ true } path="/admin" component={ LayoutContentAdminHome }/>
        <Route exact={ true } path="/admin/users" component={ LayoutContentAdminUsers } />
        <Route render={() => <h3>Ruta inexistente</h3>} />
    </RouteSwitch>
</section>;

Object.defineProperty(Component, 'name', { value: 'LayoutContentAdmin' });
export default Component;
