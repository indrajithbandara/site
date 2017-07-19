import { MediaQuery } from '../../../theme';
import Small from './style-small';

const queries = [
    { size:'mob-port', type:'screen', side:'portrait'},
];

export default ({ props, animBg, animFg }) => `
    --local-animation: 30s linear 0s infinite alternate;

    ${MediaQuery(queries, Small({ animBg, animFg }))}
`;
