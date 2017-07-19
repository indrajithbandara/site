import Theme from './default.json';
import { injectGlobal as Style } from 'styled-components';
import {
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

// I'm doing the export only to avoid the linter warning.
export const CSS = Style`
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

export const MediaQuery = (rules, content) => {
    if (!rules) throw new Error('Expecting rules');
    if (!Array.isArray(rules)) rules = [rules];
    rules = rules
        .map(rule => Object
             // convert to an iterable array
            .keys(rule)
            .map(key => ({ key, val:rule[key] }))
            // make the type declaration always the first one
            .sort((a, b) => a.key === 'type'? -1 : (b.key === 'type'? 1 : 0))
             // obtain the corresponding value from the media variable on Them
            .reduce((result, curr) => result.concat(Theme.media
                .filter(media => media.type === curr.key && media.key === curr.val)
                .map(media => media.val)
            ), [])
            .join(' and ')
        )
        .join(', ');
    return [`@media ${rules} {`, content, '}'].join('\n');
}
