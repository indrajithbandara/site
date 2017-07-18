import Theme from './default.json';
import { injectGlobal as Style } from 'styled-components';
import {
    rgba as Rgba,
    lighten as Lighten,
    darken as Darken,
    transparentize as Faint
} from 'polished';

import './icons.css';

// Convert theme into an iterable array
const theme = Object
    .keys(Theme)
    .map(name => ({ name, color:Theme[name] }));

/**
 * For each color given, create color variations for them.
 *
 * For example, given colorFoo, it would generate:
 * - colorFoo-dark, colorFoo-darker, colorFoo-darkest
 * - colorFoo-light, colorFoo-lighter, colorFoo-lightest
 * - colorFoo-faint, colorFoo-fainter, colorFoo-faintest
 */
const themeColors = theme
    .filter(({name}) => name.indexOf('color') === 0)
    .map(({name, color}) =>
        [
            {prefix:'-dark', operator: Darken},
            {prefix:'-light', operator: Lighten},
            {prefix:'-faint', operator: Faint },
        ].map(({prefix, operator}) =>
            [
                {sufix:'', mult:0.75},
                {sufix:'er', mult:0.5},
                {sufix:'est', mult:0.25}
            ].map(({sufix, mult}) => ({
                name:`${name}${prefix}${sufix}`,
                color: operator.call(operator, 1-mult, color)
            }))
        )
        .reduce((acc, cur) => acc.concat(cur), [])
    )
    .reduce((acc,cur) => acc.concat(cur), []);

const themeVars = theme
    .concat(themeColors)
    .reduce((str, cur) => [str, `--${cur.name}: ${cur.color};`].join('\n'), '');


const global = Style`
    :root {
        ${themeVars}
    }

    html {
        font-family: var(--fontBody);
        background-color: var(--colorBg);
        color: var(--colorFg);
        height: 100%;
    }

    body {
        height: inherit;
    }
`;

export default Theme;
export {Theme};

export const MediaQuery = (key, content) =>
    [
        { key: 'screen', val: 'screen' }
    ]
    .map(target =>
        [
            { key: 'landscape', val: '(orientation: landscape)'},
            { key: 'portrait', val: '(orientation: portrait)'},
        ]
        .map(orientation => Theme.sizeMedia.map((size, i , sizes) => {
            const curr = size.val[orientation.key];
            const prev = !i? 0 : ([
                // grab the number in expression and add one
                parseInt(sizes[i-1].val[orientation.key], 10) + 1,
                // grab the unit of current key
                curr.match(/[a-z]+$/)[0]
            ].join(''));
            return ({
                key: `${size.key}-${orientation.key}`,
                val: `@media ${target.val} `+
                    `and ${orientation.val} `+
                    `and (min-width: ${prev}) ` +
                    `and (max-width: ${curr}) {\n` +
                        `%%\n` +
                    `}\n`
            });
        }))
        .reduce((acc, cur) => acc.concat(cur), [])
    )
    .reduce((acc, cur) => acc.concat(cur), [])
    .filter(rule => rule.key === key)
    .map(rule => rule.val.replace('%%', content))
    .join('');

