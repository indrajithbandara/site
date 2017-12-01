import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export const Component = () => <header>
    <h1>
        <RouterLink to="/">Héctor Menéndez</RouterLink>
    </h1>
</header>;

Object.defineProperty(Component, 'name', { value: 'LayoutHeader' });
export default Component;

