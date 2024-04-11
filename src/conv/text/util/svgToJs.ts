
import { parse as parseSvg } from 'svg-parser/dist/svg-parser.esm';
import { toEstree as hastToEstree } from 'hast-util-to-estree';
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic';

import { toJs as estreeToJs, jsx } from 'estree-util-to-js';

import { ToHastOptions } from '@svgx/core';
import { minimizeXml } from './minimize';


// const HTML_JUNK = /(<><html\s*\/><head\s*\/><body\s*\/>)|(<\/body\s*><\/html\s*><\/>)/;

const HTML_JUNK = /<\/?(|html|head|body)\s*\/?>/g
const SEMI = /;$/;

export const svgToJs = async (input: string, typescript = false) => {

    input = minimizeXml(input);

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
    value = minimizeXml(value);

    // Strip junk
    value = value
        .replace(HTML_JUNK, '')
        .replace(SEMI, '');

    return value;
};

const JSX_TEMPLATE = (contents: string) =>
`
import React from 'react';

export const SvgComponent = () => {
    return (
        ${contents}
    );
};`;

const TSX_TEMPLATE = (contents: string) =>
`
import React from 'react';

export const SvgComponent: React.FC = () => {
    return (
        ${contents}
    );
};`;

export const svgToJsComponent = async (input: string, typescript = false) => {
    const contents = await svgToJs(input, typescript);

    const template = typescript ? TSX_TEMPLATE : JSX_TEMPLATE;

    return template(contents);
};

export const svgToJsxComponent = async (input: string) => svgToJsComponent(input, false);
export const svgToTsxComponent = async (input: string) => svgToJsComponent(input, true);
