import { CompleteExtendedTextCodec, TextCodec } from "../types";

import * as XmlFormatter from 'xml-formatter';
import { minimizeXml } from "../util/minimize";


export const prettyPrintXml = (input = '') => {
    if (input?.length) {
        try {
            return XmlFormatter.default(input);
        } catch (e) {
            console.info('Error pretty-printing XML:', e);
            return input;
        }
    }

    return input;
};

// export const minimizeXml = (input = '') => {
//     // Stupid, just remove extra whitespace
//     return input.replace(/\s+/g, ' ');
// };

export const PrettyPrintXmlCodec: TextCodec = {
    /**
     * Prepare the input for modification.
     * @param input 
     * @returns 
     */
    decode: (input: string) => {
        console.info('PrettyPrintXmlCodec.decode: input:', input);
        const decoded = prettyPrintXml(input);
        console.info('PrettyPrintXmlCodec.decode: decoded:', decoded);
        return decoded;
    },

    encode: (input: string) => {
        console.info('PrettyPrintXmlCodec.encode: input:', input);
        const encoded = minimizeXml(input);
        console.info('PrettyPrintXmlCodec.encode: encoded:', encoded);
        return encoded;
    },

    name: 'prettyPrintXml',
};
