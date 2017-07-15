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
    </Component>
}

// setup the color palette
const colors = Object
    .keys(Theme)
    .filter(key => key.indexOf('colorHome') === 0)
    .map(key => ({ key, val: Theme[key] }))
    .sort((a, b) => a.key < b.key? -1 : (a.key > b.key? 1 : 0))
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

const keyframesScroll = Keyframes`
    0% {}
    5%,13% {bottom: 0%; color: gray; }
    15% {bottom: 10%; color:black; }
`;

const Component = Style.section`
    display:grid;
    &:before {
        content: 'Scroll down';
        display:block;
        position: absolute;
        width: 100%;
        text-align: center;
        font-family: var(--fontHead);
        font-size: 2rem;
        font-style: italic;
        color: var(--colorBg);
        mix-blend-mode: color-dodge;
        bottom: -1em;
        color: black;
        opacity:0.66;
        animation: ${keyframesScroll} 15s ease-in 6s infinite normal;
    }

    --local-animation: 30s linear 0s infinite alternate;

    & > figure {
        display:block;
        margin:0;
        padding:0;
        background-size: 90%;
        background-position-x: 50%;
        background-position-y: 100%;
        background-blend-mode: multiply;
        background-image: url('hector-menendez.gif');
        animation: ${keyframesBg} var(--local-animation);

        /**
         * TODO: find a way to correctly infer the height of the header
         *       in order to fill the whole screen vertically.
         */
        min-height: calc(100vh - 2.55rem);

        article {
            --local-sizeArticle: 75vw;
            position:absolute;
            text-align: center;
            width: var(--local-sizeArticle);
            left:50%;
            margin-left: calc(var(--local-sizeArticle) / -2);
            bottom: 30%;
            font-size: 1.1rem;

            & p,
            & h4 {
                margin: 0;
                padding: 0;
                color: var(--colorBg);
                font-weight: normal;
                font-style: normal;
                white-space: nowrap;
                text-shadow: -1px -1px 0px rgba(0,0,0, 0.5);
            }

            & h4 {
                font-size: 1.25rem;
            }

            & p {

                & strong {
                    animation: ${keyframesFg} var(--local-animation);
                    animation-direction: alternate-reverse;
                }

                & a {
                    color:inherit;
                    text-decoration: none;

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }

            & ul {
                display: flex;
                margin: 0.5rem 0 0 0;
                padding: 0;
                list-style: none;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: space-around;
                align-items: center;

                & li {
                    padding: 0;
                    margin: 0;
                }

                & a {
                    display:block;
                    height: 1em;
                    line-height: 1em;
                    text-decoration: none;
                    animation: ${keyframesFg} var(--local-animation);
                    animation-direction: alternate-reverse;

                    span {
                        color: inherit;
                    }

                    &:hover span:before {
                        color: var(--colorBg);
                        text-shadow: 0px 0px 5px var(--colorBg-faint);
                    }
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
