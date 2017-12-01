import React from 'react';
import { Link as RouteLink } from 'react-router-dom';

export const Component = () => <header>
    <h1>
        <RouteLink to="/">Héctor Menéndez</RouteLink>
    </h1>
</header>;

Object.defineProperty(Component, 'name', { value: 'LayoutHeader' });
export default Component;

