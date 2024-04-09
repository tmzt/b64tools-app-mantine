
export type AsyncCodec = {
    readonly name: string;
    encode: (input: string) => Promise<string>;
    decode: (input: string) => Promise<string>;
};
