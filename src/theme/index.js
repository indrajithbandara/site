import Theme from './default.json';
import { injectGlobal as Style } from 'styled-components';

const vars = Object
    .keys(Theme)
    .map(name => ({ name, value:Theme[name] }))
    .reduce((str, cur) => [str, `--${cur.name}: ${cur.value};`].join('\n'), '');

const global = Style`
    :root {
        ${vars}
    }

    html {
        font-family: var(--fontBody);
        background-color: var(--colorBG);
        color: var(--colorFG);
    }
`;

export default Theme;
