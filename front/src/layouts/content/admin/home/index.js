import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export const Component = () => <section>
    <RouterLink to="/admin/users">Usuarios</RouterLink>
</section>;

Object.defineProperty(Component, 'name', { value: 'LayoutContentAdminHome' });
export default Component;
