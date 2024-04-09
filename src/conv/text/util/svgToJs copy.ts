
import { parse as parseSvg } from 'svg-parser/dist/svg-parser.esm';
import { toEstree as hastToEstree } from 'hast-util-to-estree';
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic';

import { toJs as estreeToJs, jsx } from 'estree-util-to-js';

import { ToHastOptions } from '@svgx/core';


export const svgToJsY = (input: string) => {
    const hast = parseSvg(input);

    console.info('parseHast: hast:', hast);

    const estree = hastToEstree(hast);

    console.info('parseHast: estree:', estree);

    const js = estreeToJs(estree);

    console.info('parseHast: js:', js);

    return js;
};

// export const svgToJsZ = async (input: string) => {
//     const res = await toJsx(input, { optimize: false, fromHtml: fromHtmlIsomorphic});
//     console.info('svgToJs: res:', res);
//     return res;
// };

const HTML_JUNK = /(<><html\s*\/><head\s*\/><body\s*\/>)|(<\/body\s*><\/html\s*><\/>)/;

export const minimize = (input = '') => {
    return input
        .replace(/\s+/g, ' ')
        // Also remove all whitespace around tags
        .replace(/>\s*</g, '><')
        // Trim whitespace from start and end
        .replace(/^\s+|\s+$/g, '');
};

export const svgToJs = async (input: string) => {

    input = minimize(input);

    const hastOptions: Required<ToHastOptions> = {
        optimize: false,
        svgoConfig: {},
    };

    // const hast = parseSvg(input);

    // const hast = await hastFromHtml(input, { fromHtml: fromHtmlIsomorphic });

    const hast = await fromHtmlIsomorphic(input);

    console.info('parseHast: hast:', hast);

    const estree = hastToEstree(hast);

    console.info('parseHast: estree:', estree);

    const res = estreeToJs(estree, { handlers: jsx });

    console.info('parseHast: res:', res);

    let { value } = res;

    // Remove extra whitespace
    value = minimize(value);

    // Strip junk
    // like '<><html\s*\/><head\s/><body>' and '</body></html></>'
    // value = value?.replace/

    return value;
};
