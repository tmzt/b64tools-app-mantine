
import { TextCodec } from "../types";

import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-markup';


export const HighlightCodec = (language: string): TextCodec => {
    const highlightFunc = (code: string) => highlight(code, languages[language], language);

    return {
        name: `highlight-${language}`,
        encode: (data: string) => {
            console.info(`HighlightCodec.encode: language: ${language}, data:`, data);
            const encoded = highlightFunc(data);
            console.info(`HighlightCodec.encode: language: ${language}, encoded:`, encoded);
            return encoded;
        
        },
        decode: (data: string) => data,
    };
};
