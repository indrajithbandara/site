import React from 'react';
import {Link} from 'react-router-dom';

export default class Header extends React.Component {
    render = () => <header>
        <Link to="/">Home</Link>
        <Link to="/todo">Todo</Link>
    </header>
}
