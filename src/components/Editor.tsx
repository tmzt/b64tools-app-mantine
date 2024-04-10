import React, { useEffect } from "react";

import CodeEditor from 'react-simple-code-editor';

import 'prismjs/themes/prism.css';

import { EditorFunc, EditorValueProps, useCodecEditor } from "../conv/text/codec";
import { TextCodec } from "../conv/text/types";
import { nopCodec } from "../conv/text/codecs/default";
import { Input, Stack } from "@mantine/core";
import { HighlightFunc } from "../conv/text/util/highlighting";


type EditorComponentProps = {
    value: string;
    onValueChange: (value: string) => void;
    highlight: HighlightFunc;
    styles?: React.CSSProperties;
};

/**
 * Wrapper around react-simple-code-editor providing styles
 * @param props
 * @returns 
 */
const EditorComponent = (props: EditorComponentProps) => {

    const { highlight: highlightFunc, styles } = props;

    const defaultStyles: React.CSSProperties = {
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
        width: '100%',
        border: '1px solid #ddd',
        height: '100%',
    };

    const codeStyle = { ...defaultStyles, ...styles };

    return <CodeEditor
        {...props}
        padding={10}
        style={codeStyle}
        highlight={highlightFunc}
    />;
}

type SafeEditorComponentProps = Omit<EditorComponentProps, 'value' | 'onValueChange'>;

export type EditorProps = SafeEditorComponentProps & {
    defaultValue?: string;
    value?: string;
    onChange?: (buffer: string) => void;
    codec?: TextCodec;
    label?: string;
    // lines?: number;

    initialChange?: boolean;
};

export const Editor = (props: EditorProps) => {
    const { defaultValue = '', onChange = () => {}, codec = nopCodec, initialChange = true, ...rest } = props;

    const startingValue = props.value || defaultValue;

    const editorHeight = (props?.styles?.minHeight || props?.styles?.height) || 'auto';

    const editorFunc: EditorFunc = (editorProps: EditorValueProps) => {
        return (
            <Stack>
                <Input.Wrapper label={props.label} mah={editorHeight} className="glowable">
                    <EditorComponent
                        {...editorProps}
                        {...rest}
                        // value={value}
                    />
                </Input.Wrapper>
            </Stack>
        );
    };

    const res = useCodecEditor(editorFunc, codec, { startingValue, onChange, initialChange });

    // useEffect(() => {
    //     console.info('Editor changed: ', buffer);

    //     if (onChange) {
    //         onChange(buffer);
    //     }
    // }, [buffer]);

    // return renderFunc();
    return res;
};
