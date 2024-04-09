
import { transform } from '@svgr/core';
import * as SvgrReact from '@svgr/plugin-jsx';
import { svgToJs } from '../util/svgToJs';

// TODO: Convert codecs to async and implement an async codec for this

const toJsCodeX = async (svg: string, typescript = false): Promise<string> => {
    // return transform(
    //     svg,
    //     {
    //         icon: true,
    //         typescript: false,
    //         plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
    //     },
    //     {
    //         componentName: 'SvgComponent',
    //         filePath: undefined,
    //     },
    // );

    return SvgrReact.default(svg, {
    }, { componentName: 'SvgComponent' });
};

const toJsCode = async (svg: string, typescript = false): Promise<string> => {
    return svgToJs(svg);
};

export const toJsxCode = (svg: string) => toJsCode(svg, false);
export const toTsxCode = (svg: string) => toJsCode(svg, true);
