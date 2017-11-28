import React from 'react';
// Local
import ComponentLogin from 'components/login';

export const Component = () => <section>
    <h2>Acceso al portal administrador</h2>
    <ComponentLogin redirect="/admin" />
</section>;

Object.defineProperty(Component, 'name', { value: 'LayoutLogin' });
export default Component;
