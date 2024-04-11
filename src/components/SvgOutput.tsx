
import React, { useEffect } from "react";

import { Stack, TextInput } from "@mantine/core";

import { CopyInput } from "../components/CopyInput";
import { Viewer } from "../components/Viewer";

import { makeCodecStack } from "../conv/text/codecs/codecStack";
import { completeCodec } from "../conv/text/codecs/default";
import { PrettyPrintXmlCodec } from "../conv/text/codecs/prettyPrintXml";
import { SvgToBase64Codec } from "../conv/text/codecs/svgToBase64";

import { minimizeXml } from "../conv/text/util/minimize";
import { svgToJsxComponent, svgToTsxComponent } from "../conv/text/util/svgToJs";
import { defaultSvg } from "../consts";
import { Editor } from "./Editor";
import { highlightSvg } from "../conv/text/util/highlighting";
import { fromSVGDataURI } from "../conv/text/util/svgDataURI";
import { ResponsiveImage } from "./ResponsiveImage";



// const ResponsiveSvg = ({image, alt}: {image: HTMLImageElement, alt?: string}) => {

//     const aspectRatio = image.width / image.height;

//     return (
//         <AspectRatio ratio={aspectRatio}>
//             <img src={image.src} alt={alt} />
//         </AspectRatio>
//     );
// };

export type SvgOutputProps = {
    svg?: string;
    dataURI?: string;
    hideDataURI?: boolean;
    readOnlySvg?: boolean;
    onSvgChange?: (svg: string) => void;
};

export const SvgOutput: React.FC<SvgOutputProps> = (props) => {
    const { svg: svgProp, dataURI, hideDataURI = false, readOnlySvg = false, onSvgChange = () => {}} = props;

    const svgSource = (svgProp ? svgProp : 
        (dataURI ? fromSVGDataURI(dataURI) : '')) ?? defaultSvg;

    const svgCodec = completeCodec(SvgToBase64Codec);
    const prettyPrintCodec = completeCodec(PrettyPrintXmlCodec);

    const codecs = [
        svgCodec,
        prettyPrintCodec,
    ];

    const codec = makeCodecStack(...codecs);

    const [dataURIOutput, setDataURIOutput] = React.useState<string>('');
    const [minimizedSvg, setMinimizedSvg] = React.useState<string>('');

    const [html, setHtml] = React.useState<string>('');
    const [reactJsx, setReactJsx] = React.useState<string>('');
    const [reactTsx, setReactTsx] = React.useState<string>('');

    const update = async (buffer: string) => {
        const minimizedSvgValue = minimizeXml(buffer);
        const dataUriValue = svgCodec.encode(minimizedSvgValue);

        setDataURIOutput(dataUriValue);
        setMinimizedSvg(minimizedSvgValue);

        const jsx = await svgToJsxComponent(minimizedSvgValue);
        const tsx = await svgToTsxComponent(minimizedSvgValue);

        setReactJsx(jsx);
        setReactTsx(tsx);
    };

    useEffect(() => {
        update(svgSource);
    }, []);

    return <>
        <Stack>

            {!hideDataURI && (
                <Stack>
                    <CopyInput readOnly disabled label="Data URI:" value={dataURIOutput} />
                </Stack>
            )}

            {dataURI && (
                <Stack>
                    <Stack mx={200}>
                        <ResponsiveImage src={dataURI} alt="Image" />
                    </Stack>
                </Stack>
            )}

            <Stack>
                <TextInput readOnly disabled label="Minimized SVG:" value={minimizedSvg} />
            </Stack>

            <Stack>
                {readOnlySvg ? (
                    <Viewer label="SVG:" value={svgSource} grammar="xml" language="svg" />
                ) : (
                    <Editor label="SVG:" codec={codec} defaultValue={defaultSvg} highlight={highlightSvg} onChange={onSvgChange} styles={{ minHeight: '15rem' }} />
                )}
            </Stack>

            {/* Below the fold conversions */}
            <Stack mt={20}>
            <Stack>
                    <Viewer label="HTML:" value={html} grammar="markup" language="html" />
                </Stack>

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
