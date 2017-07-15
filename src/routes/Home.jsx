import React from 'react';
import Style, {keyframes as Keyframes} from 'styled-components';
import Theme from '../theme';

export default class Home extends React.Component {
    render = () => <Component>
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
    </Component>
}

// setup the color palette
let colors = Object
    .keys(Theme)
    .filter(key => key.indexOf('colorHome') === 0)
    .map(key => ({ key, val: Theme[key] }))
    .sort((a, b) => a.key < b.key? -1 : (a.key > b.key? 1 : 0));
colors = colors
    // repeat the colors in reverse order so the transition loops infinitely
    .concat(colors
        .slice()
        .reverse()
        .slice(1) // remove the first element (it would be repeated)
    )
    // returns an array of strings ready to be replaced with a css property
    .reduce((result, cur, i, arr) => result.concat(
        `${ i * 100 / (arr.length-1) }% { %%: var(--${cur.key}); }`
    ), []);

const keyframesBg = Keyframes`${colors
    .map(rule => rule.replace('%%', 'background-color'))
    .join('\n')
}`;

const keyframesFg = Keyframes`${colors
    .map(rule => rule.replace('%%', 'color'))
    .join('\n')
}`;

const Component = Style.section`
    display:grid;

    & > figure {
        display:block;
        margin:0;
        padding:0;
        background-size: 90%;
        background-position-x: 50%;
        background-position-y: 100%;
        background-blend-mode: multiply;
        background-image: url('hector-menendez.gif');
        animation: ${keyframesBg} 30s linear infinite;

        /**
         * TODO: find a way to correctly infer the height of the header
         *       in order to fill the whole screen vertically.
         */
        min-height: calc(100vh - 2.55rem);

        article {
            --local-sizeArticle: 66vw;
            position:absolute;
            text-align: center;
            width: var(--local-sizeArticle);
            left:50%;
            margin-left: calc(var(--local-sizeArticle) / -2);
            bottom: 30%;
            text-shadow: -1px -1px 0px rgba(0,0,0, 0.5);

            & p,
            & h4 {
                margin: 0;
                padding: 0;
                color: var(--colorBg);
                font-weight: normal;
                font-style: normal;
                white-space: nowrap;
            }

            & h4 {
                font-size: 1.25rem;
            }

            & strong {
                animation: ${keyframesFg} 30s linear infinite;
            }

            & a {
                color:inherit;
                text-decoration: none;

                &:hover {
                    text-decoration: underline;
                }
            }

        }
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
