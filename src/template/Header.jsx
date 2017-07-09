import React from 'react';
import Style from 'styled-components';
import {Link} from 'react-router-dom';

const Component = Style.header`
    --height:3rem;

    height: var(--height);
    background: yellow;

    > h1 {
        margin: 0;
        padding: 0;
        letter-spacing: -0.03em;
        line-height: var(--height);
        font-family: var(--fontHead);
        font-size: var(--height);
        font-weight:normal;

        > a {
            color: inherit;
            text-decoration: none;
        }
    }
`

export default class Header extends React.Component {
    render = () => <Component>
        <h1><Link to="/">Héctor Menéndez</Link></h1>
        <nav>
            <Link to="/">Home</Link>
        </nav>
    </Component>
}
