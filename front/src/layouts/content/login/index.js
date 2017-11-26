import React from 'react';

export const Component = () => <form>
    <section>
        <label>Username</label>
        <input type="email" name="email" />
    </section>
    <section>
        <label>Password</label>
        <input type="password" name="password" />
    </section>
    <button type="submit">Submit</button>
</form>;

Object.defineProperty(Component, 'name', { value: 'LayoutLogin' });
export default Component;
