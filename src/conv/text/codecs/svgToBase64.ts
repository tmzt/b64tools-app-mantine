import { CompleteExtendedTextCodec, TextCodec } from "../types";
import { toSVGDataURI, fromSVGDataURI } from "../util/svgDataURI";


export const SvgToBase64Codec: TextCodec = {
    encode: (input: string) => {
        console.info('SvgToBase64Codec.encode: input:', input);
        const encoded = toSVGDataURI(input);
        console.info('SvgToBase64Codec.encode: encoded:', encoded);
        return encoded;
    },
    decode: (input: string) => {
        console.info('SvgToBase64Codec.decode: input:', input);
        const decoded = fromSVGDataURI(input);
        console.info('SvgToBase64Codec.decode: decoded:', decoded);
        return decoded;
    },

    name: 'svgToBase64',
};
