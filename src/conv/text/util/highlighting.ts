
import { GrammarToken, highlight, languages } from "prismjs/components/prism-core";
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';


export type HighlightFunc = (code: string) => string;

export type Grammar = { [x: string]: RegExp | GrammarToken | (RegExp | GrammarToken)[]; }
export type GrammarRef = string | Grammar;

export const toGrammar = (grammar: GrammarRef): Grammar => {
    if (typeof grammar === 'string') {
        return languages[grammar];
    }
    return grammar;
};

export const makeHighlight = (grammarRef: GrammarRef, language: string): HighlightFunc => {
    const grammar = toGrammar(grammarRef);
    const highlightFunc = (code: string) => highlight(code, grammar, language);

    return highlightFunc;
};

export const highlightSvg: HighlightFunc = (code: string) => highlight(code, languages.xml, 'svg');
export const highlightJsx: HighlightFunc = (code: string) => highlight(code, languages.jsx, 'jsx');
export const highlightTsx: HighlightFunc = (code: string) => highlight(code, languages.tsx, 'tsx');
