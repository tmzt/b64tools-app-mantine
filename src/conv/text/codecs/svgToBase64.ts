import { CompleteExtendedTextCodec, TextCodec } from "../types";


export const toDataUri = (input: string) => {
    try {
        return `data:image/svg+xml;base64,${btoa(input)}`;
    } catch (e) {
        console.info('Error encoding SVG to base64 data uri:', e);
        return input;
    }
};

export const fromDataUri = (input: string) => {
    try {
        return atob(input.replace(/^data:image\/svg\+xml;base64,/, ''));
    } catch (e) {
        console.info('Error decoding SVG from base64 data uri:', e);
        return input;
    }
};

export const SvgToBase64Codec: TextCodec = {
    encode: (input: string) => {
        console.info('SvgToBase64Codec.encode: input:', input);
        const encoded = toDataUri(input);
        console.info('SvgToBase64Codec.encode: encoded:', encoded);
        return encoded;
    },
    decode: (input: string) => {
        console.info('SvgToBase64Codec.decode: input:', input);
        const decoded = fromDataUri(input);
        console.info('SvgToBase64Codec.decode: decoded:', decoded);
        return decoded;
    },

    name: 'svgToBase64',
};
