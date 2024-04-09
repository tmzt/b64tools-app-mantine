
import React from "react";

import { Input, Stack } from "@mantine/core";
import { completeCodec, stringNop } from "../conv/text/codecs/default";
import { TextCodec } from "../conv/text/types";

import 'prismjs/themes/prism.css';
// import 'prismjs/components/prism-markup';

import { GrammarToken, highlight, languages } from 'prismjs/components/prism-core';
import { CopyActionButton } from "./CopyActionButton";
import { GrammarRef, makeHighlight, toGrammar } from "../conv/text/util/highlighting";


const viewerDivStyles: React.CSSProperties = {
    border: '1px solid #ddd',
    boxSizing: 'border-box',
    fontFamily: '"Fira code", "Fira Mono", monospace',
    fontSize: 12,
    height: '100%',
    minHeight: '15rem',
    overflow: 'hidden',
    padding: 0,
    position: 'relative',
    textAlign: 'left',
    width: '100%',

    backgroundColor: 'rgb(241, 243, 245)',
};

const viewerStyles: React.CSSProperties = {
    margin: 0,
    border: 0,
    // background: 'none',
    boxSizing: 'inherit',
    display: 'inherit',
    fontFamily: 'inherit',
    whiteSpace: 'pre-wrap',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word',
    position: 'relative',
    pointerEvents: 'none',
    padding: 10,

    backgroundColor: 'rgb(241, 243, 245)',
};

export type ViewProps = {
    label?: string;
    value?: string;

    codec?: TextCodec;

    // highlightFunc?: (code: string) => string;

    // Prismjs options
    grammar?: GrammarRef;
    language?: string;
};

export const Viewer = (props: ViewProps) => {
    // const { label, value = '', codec = {}, highlightFunc = stringNop } = props;
    const { 
        label,
        value = '',
        grammar: grammarRef = 'text',
        language = 'text',
        codec = {},
    } = props;

    const { decode } = completeCodec(codec);
    const decoded = decode(value);

    const highlightFunc = makeHighlight(grammarRef, language);
    const highlighted = highlightFunc(decoded);
    const highlightedContents = { __html: highlighted };

    // const viewer = (
    //     <pre className={`viewer prism-jsx languages-${language}`} style={viewerStyles} dangerouslySetInnerHTML={highlightedContents} />
    // );

    const Highlighted = () => {
        return <pre className={`viewer prism-jsx languages-${language}`} style={viewerStyles} dangerouslySetInnerHTML={highlightedContents} />;
    };

    return (
        <Stack>
            <Input.Wrapper label={label}>
                <Input component={Highlighted} style={viewerDivStyles} rightSection={<CopyActionButton />} />
            </Input.Wrapper>
        </Stack>
    )

    // return (
    //     <Stack>
    //         <Input.Wrapper label={label}>
    //             <div style={viewerDivStyles}>
    //                 <pre className={`viewer prism-jsx languages-${language}`} style={viewerStyles} dangerouslySetInnerHTML={highlightedContents} />
    //             </div>
    //         </Input.Wrapper>
    //     </Stack>
    // );
};
