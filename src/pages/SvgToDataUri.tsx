
import React, { useEffect } from "react";

import { Stack, Text, TextInput, Title } from "@mantine/core";

import { CopyInput } from "../components/CopyInput";
import { Editor } from "../components/Editor";
import { ReverseButton } from "../components/Reverse";
import { Viewer } from "../components/Viewer";

import { makeCodecStack } from "../conv/text/codecs/codecStack";
import { completeCodec } from "../conv/text/codecs/default";
import { PrettyPrintXmlCodec } from "../conv/text/codecs/prettyPrintXml";
import { SvgToBase64Codec } from "../conv/text/codecs/svgToBase64";

import { highlightSvg } from "../conv/text/util/highlighting";
import { minimizeXml } from "../conv/text/util/minimize";
import { svgToJsxComponent, svgToTsxComponent } from "../conv/text/util/svgToJs";


const defaultSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle class="cls-1" cx="50" cy="50" r="40" style="fill: blue; stroke: red;" />
</svg>`;

export const SvgToDataURI = () => {

    const svgCodec = completeCodec(SvgToBase64Codec);
    const prettyPrintCodec = completeCodec(PrettyPrintXmlCodec);

    const codecs = [
        svgCodec,
        prettyPrintCodec,
    ];

    const codec = makeCodecStack(...codecs);

    const [dataUri, setDataUri] = React.useState<string>('');
    const [minimizedSvg, setMinimizedSvg] = React.useState<string>('');
    const [reactJsx, setReactJsx] = React.useState<string>('');
    const [reactTsx, setReactTsx] = React.useState<string>('');

    const update = async (buffer: string) => {
        const minimizedSvgValue = minimizeXml(buffer);
        const dataUriValue = svgCodec.encode(minimizedSvgValue);

        setDataUri(dataUriValue);
        setMinimizedSvg(minimizedSvgValue);

        const jsx = await svgToJsxComponent(minimizedSvgValue);
        const tsx = await svgToTsxComponent(minimizedSvgValue);

        setReactJsx(jsx);
        setReactTsx(tsx);
    };

    const onChange = (buffer: string) => {
        update(buffer)
            .then(() => {
                console.info('SvgToDataUri.onChange: updated');
            });
    };

    useEffect(() => {
        update(defaultSvg);
    }, []);

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
