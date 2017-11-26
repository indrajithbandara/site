import React from 'react';
// Local
import LayoutHeader from 'layouts/header';
import LayoutContent from 'layouts/content';
import LayoutFooter from 'layouts/footer';

export const Component = () => <main>
    <LayoutHeader/>
    <LayoutContent/>
    <LayoutFooter/>
</main>;

Object.defineProperty(Component, 'name', { value: 'Layout' });
export default Component;

