import React from 'react';
import Style from 'styled-components';
import {Link} from 'react-router-dom';

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

const Component = Style.header`
    display: grid;

    & a {
        color: inherit;
        text-decoration: none;
        display: block;
        white-space: nowrap;
    }

    & > h1 {
        margin: 0;
        padding: 0;
        letter-spacing: -0.03em;
        font-family: var(--fontHead);
        font-weight: normal;
    }

    & > nav {

        & ul {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        & li {
            margin-left: var(--spaceH);
            font-weight: lighter;
            text-transform: uppercase;
            font-size: 0.8rem;
        }

        & a:hover {
            text-decoration: underline;
        }

    }

    /** Small devices **/
    @media screen and (max-width: 414px){
        grid-template-columns: 1fr auto;
        grid-template-rows: 1fr;

        /* Center title page absolutely on container */
        & > h1 {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        /* Show a hamburguer menu using an input/label as triggers */
        & > nav {
            overflow: hidden;
            user-select: none; /* Disables text selection */
            display: grid;
            grid-template-rows: 1fr;
            grid-template-columns: 2rem auto;
            grid-template-areas: "input menu";
            grid-column-gap: 0.5rem;
            align-items: center;

            & input {
                z-index: 1;
                -webkit-touch-callout: none; /* Fix Safari showing on touch */
                height: 2rem;
                opacity:0;
                grid-area: input;
                cursor: pointer;
            }

            & label {
                grid-area: input;
                cursor: pointer;

                &, &:before, &:after {
                    z-index: 3;
                    display:block;
                    position: relative;
                    background-color: var(--colorFG);
                    height: 5px;
                    border-radius: 5px;
                    grid-area: input;
                    content: '';
                    transition: all 0.5s ease;
                }

                &:before {
                    top: -8px;
                }

                &:after {
                    top: 3px;
                }
            }

            ul {
                z-index: 2;
                grid-area: menu;
                overflow: hidden;
                margin-top: -100vh;
                margin-right: -100vw;
                transition: margin-top 0.33s ease, margin-right 0.33s ease;

                a {
                    padding-right: 1rem;
                    line-height: 2rem;
                }
            }

            & input:checked {

                & ~ label {
                    background-color: transparent;

                    &:before, &:after {
                        background-color: var(--colorFG-lighter)
                    }
                    &:before {
                        transform: rotate(45deg);
                        top:0;
                    }
                    &:after {
                        transform: rotate(-45deg);
                        top:-5px;
                    }
                }

                & ~ ul {
                    margin-top: 0;
                    margin-right:0;
                }
            }

        }
    }
`;
