import { CompleteExtendedTextCodec, TextCodec } from "../types";


/**
 * A codec that does nothing but pass the input through.
 * @param input (string)
 * @returns The input string
 */
export const stringNop = (input: string) => input;


/**
 * A codec that does nothing but pass the input through.
 */
export const nopCodec: CompleteExtendedTextCodec = {
    encode: (input: string) => input,
    decode: (input: string) => input,
    encodeDecode: (input: string) => input,
    name: 'nop',
};


/**
 * Wrap a text codec with defaults for the encode, decode, and encodeDecode functions
 * (if they are absent).
 * @param codec 
 * @returns 
 */
export const completeCodec = (codec: TextCodec): CompleteExtendedTextCodec => {
    const { encode = stringNop, decode = stringNop } = codec;

    const encodeDecode = (input: string) => decode(encode(input));

    const name = codec.name || 'unnamed';

    return { encode, decode, encodeDecode, name };
};
