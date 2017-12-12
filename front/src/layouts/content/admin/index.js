import React from 'react';
import {
    Route,
    Switch as RouterSwitch,
    Link as RouterLink,
} from 'react-router-dom';
// Local
import LayoutContentAdminUsers from 'layouts/content/admin/users';
import LayoutContentAdminPosts from 'layouts/content/admin/posts';

export const Component = () => <section>
    <h2>
        <RouterLink to="/admin">Administrador</RouterLink>
    </h2>
    <RouterSwitch>
        <Route exact={ true } path="/admin/users" component={ LayoutContentAdminUsers }/>
        <Route exact={ true } path="/admin/posts/:_id?" component={ LayoutContentAdminPosts }/>

        {/* --------------------------------------------------------------------- Home */}

        <Route exact={ true } path="/admin" render={() => <section>
            <figure> <RouterLink to="/admin/users">Usuarios</RouterLink> </figure>
            <figure> <RouterLink to="/admin/posts">Artículos</RouterLink> </figure>
        </section>}/>

        {/* .--------------------------------------------------------------------- 404 */}

        <Route render={() => <h3>Ruta inexistente</h3>} />
    </RouterSwitch>
</section>;

Object.defineProperty(Component, 'name', { value: 'LayoutContentAdmin' });
export default Component;
