import React from 'react';
import Style from 'styled-components';
import {Link} from 'react-router-dom';

export default class Header extends React.Component {
    render = () => <Component>
        <h1><Link to="/">Héctor Menéndez</Link></h1>
        <ul>
            <li><Link to="/thoughts">Thoughts</Link></li>
            <li><Link to="/photo">Photos</Link></li>
            <li><Link to="/contact">Contact</Link></li>
        </ul>
    </Component>
}

const Component = Style.header`
    --spaceH: 1em;

    display:flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 var(--spaceH);

    background-color: tomato;

    & > h1,
    & > ul {
        margin:0;
        padding:0;

        a {
            color:inherit;
            text-decoration:none;
            display:block;
            white-space: nowrap;
        }
    }

    & > h1 {
        letter-spacing: -0.03em;
        font-family: var(--fontHead);
        font-weight:normal;
    }

    & > ul {
        list-style:none;
        display:flex;
        flex-direction:row;

        > li {
            margin-left: var(--spaceH);
            font-weight: light;
            text-transform: uppercase;
            font-size: 0.8rem;
        }

        a:hover {
            text-decoration:underline;
        }
    }
`;
