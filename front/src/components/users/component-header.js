import React from 'react';

export const Component = () => <header>
    <span>Email</span>
    <span>First Name</span>
    <span>Last Name</span>
    <span>Password</span>
    <span>Actions</span>
</header>;

Object.defineProperty(Component, 'name', { value: 'ComponentUserHeader' });
export default Component;
