import React from "react";


import { Stack, Title, Text, Input, JsonInput, TextInput } from "@mantine/core";

import { Editor } from "../components/Editor";
import { ReverseButton } from "../components/Reverse";
import { CopyInput } from "../components/CopyInput";
import { SvgToBase64Codec } from "../conv/text/codecs/svgToBase64";
import { PrettyPrintXmlCodec } from "../conv/text/codecs/prettyPrintXml";
import { makeCodecStack } from "../conv/text/codecs/codecStack";
import { completeCodec } from "../conv/text/codecs/default";
import { Viewer } from "../components/Viewer";
import { toJsxCode, toTsxCode } from '../conv/text/codecs/svgToReact';
import { minimize } from "../conv/text/util/minimize";
import { svgToJsxComponent, svgToTsxComponent } from "../conv/text/util/svgToJs";
import { highlightSvg } from "../conv/text/util/highlighting";


// const base64DataUriEncode = (data: string) => {
//     return `data:image/svg+xml;base64,${btoa(data)}`;
// }

export const SvgToDataUri = () => {

    //     const defaultSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
    // <rect x="10" y="10" width="80" height="80" fill="blue" />
    // </svg>`;


//     const defaultSvg = `
// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
//     <style>
//     .cls-1 {
//         fill: #f00;
//     }
//     </style>
//     <circle class="cls-1" cx="50" cy="50" r="40"/>
// </svg>
// `;

    const defaultSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle class="cls-1" cx="50" cy="50" r="40" style="fill: blue; stroke: red;" />
</svg>
`;

    // const highlightSvg: HighlightFunc = (code: string) => highlight(code, languages.markup, 'svg');
    // const highlightJsx: HighlightFunc = (code: string) => highlight(code, languages.jsx, 'jsx');
    // const highlightTsx: HighlightFunc = (code: string) => highlight(code, languages.tsx, 'tsx');

    const svgCodec = completeCodec(SvgToBase64Codec);
    const prettyPrintCodec = completeCodec(PrettyPrintXmlCodec);

    const codecs = [
        svgCodec,
        prettyPrintCodec,
    ];

    const codec = makeCodecStack(...codecs);

    // const codec = PrettyPrintXmlCodec;

    const [dataUri, setDataUri] = React.useState<string>('');
    const [minimizedSvg, setMinimizedSvg] = React.useState<string>('');
    const [reactJsx, setReactJsx] = React.useState<string>('');
    const [reactTsx, setReactTsx] = React.useState<string>('');

    const update = async (buffer: string) => {
        const dataUriValue = svgCodec.encode(buffer);
        const minimizedSvgValue = minimize(buffer);

        setDataUri(dataUriValue);
        setMinimizedSvg(minimizedSvgValue);

        const jsx = await svgToJsxComponent(minimizedSvgValue);
        const tsx = await svgToTsxComponent(minimizedSvgValue);

        setReactJsx(jsx);
        setReactTsx(tsx);
    };

    const onChange = (buffer: string) => {
        // setDataUri(svgCodec.encode(buffer));
        // setMinimizedSvg(prettyPrintCodec.encode(buffer));
        // // setReactJsx(`const SvgComponent = () => ${toJsxCode(buffer)}`);
        // // setReactTsx(`const SvgComponent: React.FC = () => ${toTsxCode(buffer)}`);
        // setReactJsx(await toJsxCode(buffer));
        // setReactTsx(await toTsxCode(buffer));
        update(buffer)
            .then(() => {
                console.info('SvgToDataUri.onChange: updated');
            });
    };

    const { encode, decode } = completeCodec(codec);

    return <>
        <Stack>
            <Title>SVG to Data URI <ReverseButton /></Title>
            <Text size="sm">Enter the SVG to convert. You can also select a file to process (the file will not leave your computer).</Text>

            <Stack>
                <CopyInput readOnly disabled label="Data URL:" value={dataUri} />
            </Stack>

            <Stack>
                <TextInput readOnly disabled label="Minimized SVG:" value={minimizedSvg} />
            </Stack>

            <Stack>
                <Editor label="SVG:" codec={codec} defaultValue={defaultSvg} highlight={highlightSvg} onChange={onChange} styles={{ minHeight: '15rem' }} />
            </Stack>

            {/* Below the fold conversions */}
            <Stack mt={20}>
                <Stack>
                    <Viewer label="React (JSX):" value={reactJsx} grammar="jsx" language="jsx" />
                </Stack>

                <Stack>
                    <Viewer label="React (TSX):" value={reactTsx} grammar="tsx" language="tsx" />
                </Stack>
            </Stack>

        </Stack>
    </>;
};
