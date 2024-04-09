import { useState, useEffect, SetStateAction, useMemo, Dispatch } from "react";
import { completeCodec } from "./codecs/default";
import { TextCodec } from "./types";


export type EditorValueProps = {
    value: string;
    onValueChange: (value: string) => void;
    onBlur: (...args: any[]) => void;
};

export type OnBufferChange = (buffer: string) => void;
export type EditorFunc = (props: EditorValueProps) => React.ReactNode;
export type RenderFunc = () => React.ReactNode;

type UseCodecEditorReturn = [string, Dispatch<SetStateAction<string>>, RenderFunc];

export const useCodecEditor = (editorFunc: EditorFunc, codec: TextCodec, defaultValue = '', onBufferChange?: OnBufferChange): UseCodecEditorReturn => {
    // const { encode = stringNop, decode = stringNop } = codec;

    const { encode, decode } = completeCodec(codec);

    // Internal buffer (encoded version)
    const [editorBuffer, setEditorBuffer] = useState(decode(defaultValue));

    // Exposed buffer (non-encoded version)
    const [exposedBuffer, setExposedBuffer] = useState(encode(defaultValue));

    const renderFunc = () => {

        // // When the editor value changes:
        // //  1. Update the editor buffer with the encoded value
        // //  2. Update the exposed buffer with the decoded value
        // //  3. Fire an event with the decoded value
        // const onValueChange = (value: string) => {

        //     // // For example, pretty print for the editor
        //     // // and minimize for the exposed buffer
        //     // // const encoded = encode(value);
        //     // // const decoded = decode(encoded);

        //     // const forEditor = decode(value);
        //     // const encoded = encode(forEditor);

        //     // setEditorBuffer(forEditor);
        //     // setBuffer(encoded);

        //     // if (onBufferChange) {
        //     //     onBufferChange(encoded);
        //     // }
        // };

        const onValueChange = (value: string) => {
            setEditorBuffer(value);
        };

        // // When the exposed buffer changes:
        // //  1. Update the editor buffer with the encoded value
        // //  2. Update the exposed buffer with the decoded value
        // //  3. DO NOT fire an event
        // useEffect(() => {
        //     const encoded = encode(buffer);
        //     const decoded = decode(encoded);

        //     setEditorBuffer(encoded);
        // }, [buffer]);

        // On blur, update the editor buffer with the encoded value.
        // For example, pretty print the contents in the editor.

        const onBlur = () => {
            const decoded = decode(editorBuffer);
            setEditorBuffer(decoded);
            
            const encoded = encode(decoded);
            setExposedBuffer(encoded);

            if (onBufferChange) {
                onBufferChange(encoded);
            }
        };

        // Memoize the editor function
        return useMemo(() => {
            return editorFunc({ value: editorBuffer, onValueChange, onBlur })
        }, [editorBuffer]);
    };

    return [exposedBuffer, setExposedBuffer, renderFunc];
};
