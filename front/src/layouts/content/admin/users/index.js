import React from 'react';
// Local
import {
    Mod as ComponentUsersMod,
    Add as ComponentUsersAdd,
} from 'components/users';

export const Component = () => <section>
    <h3>Usuarios</h3>
    <ComponentUsersAdd/>
    <ComponentUsersMod/>
</section>;

Object.defineProperty(Component, 'name', { value: 'LayoutContentAdminUsers' });
export default Component;
