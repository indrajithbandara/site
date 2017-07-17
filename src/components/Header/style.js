import Style from 'styled-components';

export default Style.header`
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
            font-weight: lighter;
            text-transform: uppercase;
            font-size: 0.8rem;
        }

        & a:hover {
            text-decoration: underline;
        }

    }

    /** Small devices **/
    @media screen and (max-width: ${prop => prop.theme.sizeScreenSmall}){
        --local-sizeInput: 2rem;
        --local-sizeBarHeight: 5px;
        --local-sizeBarSpace: 3px;

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
            grid-template-columns: var(--local-sizeInput) auto;
            grid-template-areas: "input menu";
            grid-column-gap: calc(var(--sizeGapCol) / 2);
            align-items: center;

            & input {
                z-index: 1;
                -webkit-touch-callout: none; /* Fix Safari showing on touch */
                height: var(--local-sizeInput);
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
                    background-color: var(--colorFg);
                    height: var(--local-sizeBarHeight);
                    border-radius: var(--local-sizeBarHeight);
                    grid-area: input;
                    content: '';
                    transition: all 0.5s ease;
                }

                &:before {
                    top: calc(
                        -1 * calc(var(--local-sizeBarHeight) + var(--local-sizeBarSpace))
                    )
                }

                &:after {
                    top: var(--local-sizeBarSpace);
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
                    padding-right: var(--sizeGapCol);
                    line-height: var(--local-sizeInput);
                }
            }

            & input:checked {

                & ~ label {
                    background-color: transparent;

                    &:before, &:after {
                        background-color: var(--colorFg-lighter)
                    }
                    &:before {
                        transform: rotate(45deg);
                        top:0;
                    }
                    &:after {
                        transform: rotate(-45deg);
                        top: calc(-1 * var(--local-sizeBarHeight));
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
