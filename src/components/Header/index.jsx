import React from 'react';
import {Link} from 'react-router-dom';
import Style from './style';

export default class Header extends React.Component {
    render = () => <Style>
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
    </Style>
}

