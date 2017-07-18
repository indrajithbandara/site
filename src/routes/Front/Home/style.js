import { keyframes as Keyframes } from 'styled-components';

export default ({ props, animBg, animFg }) => `
    --local-animation: 30s linear 0s infinite alternate;

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
        animation: ${Keyframes`
            0% {}
            5%,13% {bottom: 0%; color: gray; }
            15% {bottom: 10%; color:black; }
        `} 15s ease-in 6s infinite normal;
    }

    & > figure {
        display:block;
        margin:0;
        padding:0;
        min-height: calc(100vh - 2.55rem); /* TODO: auto infer header height */
        background-size: 90%;
        background-position-x: 50%;
        background-position-y: 100%;
        background-blend-mode: multiply;
        background-image: url('hector-menendez.gif');
        animation: ${animBg} var(--local-animation);

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
                    animation: ${animFg} var(--local-animation);
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
                    animation: ${animFg} var(--local-animation);
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
`;
