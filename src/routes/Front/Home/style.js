import { MediaQuery } from '../../../theme';
import Small from './style-small';

export default ({ props, animBg, animFg }) => `
    --local-animation: 30s linear 0s infinite alternate;

    ${MediaQuery('small-portrait', Small({ animBg, animFg }))}
`;
