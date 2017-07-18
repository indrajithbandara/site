import React from 'react';
import StyledComponents, {keyframes as Keyframes} from 'styled-components';

import Theme from '../../../theme';
import Style from './style';

// Template  for a keyframe transition.
// returns an array of strings ready to be replaced with a css property
const colors = Object
    .keys(Theme)
    .filter(key => key.indexOf('colorHome') === 0)
    .map(key => ({ key, val: Theme[key] }))
    .sort((a, b) => a.key < b.key? -1 : (a.key > b.key? 1 : 0))
    .reduce((result, cur, i, arr) => result.concat(
        `${ i * 100 / (arr.length-1) }% { %%: var(--${cur.key}); }`
    ), []);

const Component = StyledComponents.section`${props => Style({
    props,
    animBg: Keyframes`${colors
        .map(rule => rule.replace('%%', 'background-color'))
        .join('\n')
    }`,
    animFg: Keyframes`${colors
        .map(rule => rule.replace('%%', 'color'))
        .join('\n')
    }`
})}`;

export default () => <Component>
    <figure>
        <article>
            <h4>Hola, I'm Hector,</h4>
            <p>
                <span> a Mexican </span>
                <strong> software architect </strong>
            </p>
            <p>
                <span> working in </span>
                <strong> Mexico </strong>
                <span> at </span>
                <a href="https://technisys.com">Technisys</a>
            </p>
            <ul>
                <li>
                    <a href="#"><span className="icon-facebook2"/></a>
                </li>
                <li>
                    <a href="#"><span className="icon-instagram"/></a>
                </li>
                <li>
                    <a href="#"><span className="icon-spotify"/></a>
                </li>
                <li>
                    <a href="#"><span className="icon-twitter"/></a>
                </li>
                <li>
                    <a href="#"><span className="icon-youtube"/></a>
                </li>
                <li>
                    <a href="#"><span className="icon-github"/></a>
                </li>
                <li>
                    <a href="#"><span className="icon-npm"/></a>
                </li>
                <li>
                    <a href="#"><span className="icon-linkedin"/></a>
                </li>
                <li>
                    <a href="#"><span className="icon-lastfm2"/></a>
                </li>
                <li>
                    <a href="#"><span className="icon-pinterest"/></a>
                </li>
            </ul>

        </article>
    </figure>
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
</Component>;
