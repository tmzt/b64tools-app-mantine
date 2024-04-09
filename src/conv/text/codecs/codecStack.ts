import { CompleteExtendedTextCodec, TextCodec } from "../types";
import { completeCodec } from "./default";


// /**
//  * Create an encode-decode function from a codec.
//  * 
//  * For example, pretty-print the input and then minimize it. This ensures we
//  * get a canonical representation of the input.
//  * 
//  * @param codec 
//  * @returns 
//  */
// export const makeEncodeDecode = (codec: TextCodec = nullCodec) => {
//     const { encode, decode } = codecDefaults(codec);

//     return (input: string) => decode(encode(input));
// };



/**
 * Create a codec stack from a list of codecs
 * @param codecs 
 * @returns 
 */
export const makeCodecStack = (...codecs: TextCodec[]): CompleteExtendedTextCodec => {
    return {
        encode: (input: string) => {
            return codecs.reduceRight((acc, codec) => {
                const { encode } = completeCodec(codec);
                const encoded = encode(acc);
                console.info(`makeCodecStack.encode: ${acc} -> ${encoded} (${codec.name})`);
                return encoded;
            }, input);
        },
        decode: (input: string) => {
            return codecs.reduce((acc, codec) => {
                const { decode } = completeCodec(codec);
                const decoded = decode(acc);
                console.info(`makeCodecStack.decode: ${acc} -> ${decoded} (${codec.name})`);
                return decoded;
            }, input);
        },
        encodeDecode: (input: string) => {
            return codecs.reduce((acc, codec) => {
                const { encodeDecode } = completeCodec(codec);
                return encodeDecode(acc);
            }, input);
        },
        name: `stack([${codecs.map(c => c.name).join(', ')}])`,
    };
};
