import React from 'react';

export const Component = () => <footer>
    <h6><small>
        <span>All rights reserved, </span>
        <em>Héctor Adán Menéndez Rivera </em>
        <span>1981 - {(new Date()).getFullYear()}</span>
    </small></h6>
</footer>;

Object.defineProperty(Component, 'name', { value: 'ComponentFooter' });
export default Component;
