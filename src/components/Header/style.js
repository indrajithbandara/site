import { MediaQuery } from '../../theme';
import Small from './style-small';

const queries = [
    { size:'mob-port', type:'screen', side:'portrait'},
    { size:'mob-land', type:'screen', side:'landscape'}
];

export default ({ props }) => `
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

    ${MediaQuery(queries, Small({ props }))}
`;
