
export type TextCodec = {
    /**
     * Encode the input to the preferred format for modification.
     */
    encode?: (input: string) => string;
    decode?: (input: string) => string;

    readonly name?: string;
};

export type ExtendedTextCodec = TextCodec & {
    /**
     * Encode and then decode the input.
     * 
     * For example, pretty-print the input and then minimize it. This ensures we
     * get a canonical representation of the input.
     * 
     * @param input
     * @returns
     * 
     */
    encodeDecode: (input: string) => string;
};

/**
 * This type guarantees that the codec has encode, decode, and encodeDecode functions.
 */
export type CompleteExtendedTextCodec = Required<ExtendedTextCodec> & { readonly name: string };
