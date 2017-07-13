import React from 'react';
import Style, {keyframes as Keyframes} from 'styled-components';
import Theme from '../theme';

export default class Home extends React.Component {
    render = () => <Component>
        <figure></figure>
        <aside>
            <h2>Hola Mundo</h2>
            <ul>
                <li> content </li>
                <li> content </li>
                <li> content </li>
                <li> content </li>
                <li> content </li>
                <li> content </li>
                <li> content </li>
                <li> content </li>
                <li> content </li>
                <li> content </li>
            </ul>
        </aside>
    </Component>
}

const colors = Object
    .keys(Theme)
    .filter(key => key.indexOf('colorHome') === 0)
    .map(key => ({ key, val: Theme[key] }))
    .sort((a, b) => a.key < b.key? -1 : (a.key > b.key? 1 : 0));

const keyframes = Keyframes`${colors
    // repeat the colors in reverse order so the transition loops infinitely
    .concat(colors
        .slice()
        .reverse()
        .slice(1) // remove the first element (it would be repeated)
    )
    .reduce((res, cur, i, arr) => [
        res,
        `${ i * 100 / (arr.length-1) }% {background-color: var(--${cur.key}); }`
    ].join('\n'), '')}`;

const Component = Style.section`
    display:grid;

    & > figure {
        display:block;
        min-height: calc(100vh - 3rem);
        background-size: 90%;
        background-position-x: 50%;
        background-position-y: 100%;
        background-blend-mode: multiply;
        background-image: url('hector-menendez.gif');
        animation: ${keyframes} 30s linear infinite;
        margin:0;
        padding:0;
    }

    & > aside {
        background-color: var(--colorBG-lighter);
        padding: 1em;
    }

    /** Small devices **/
    @media screen and (max-width: ${prop => prop.theme.sizeScreenSmall}){
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
    }

`;
