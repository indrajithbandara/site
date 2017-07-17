import React from 'react';
import {Link} from 'react-router-dom';
import StyledComponent from 'styled-components';

import StyleAll from './style';
import StyleSmall from './style-small';

const Component = StyledComponent.header`
    ${StyleAll}
    @media screen and (max-width: ${prop => prop.theme.sizeScreenSmall}){${ StyleSmall} }
`;

export default class Header extends React.Component {
    render = () => <Component>
        <h1><Link to="/">Héctor Menéndez</Link></h1>
        <nav>
            <input id="header-nav__menu" type="checkbox" />
            <label htmlFor="header-nav__menu"/>
            <ul>
                <li><Link to="/thoughts">Thoughts</Link></li>
                <li><Link to="/photo">Photos</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </nav>
    </Component>
}
