import React from 'react';
// Local
import ComponentUsersMod from 'components/users-mod';

export const Component = () => <section>
    <h3>Usuarios</h3>
    <ComponentUsersMod/>
</section>;

Object.defineProperty(Component, 'name', { value: 'LayoutContentAdminUsers' });
export default Component;
