
import React, { useEffect } from "react";

import { AspectRatio, Stack, TextInput } from "@mantine/core";

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
import { fromImageDataURI, imageDataURIToReactJSX, imageDataURIToReactTSX } from "../conv/image/util/imageDataURI";
import { ResponsiveImage } from "./ResponsiveImage";


export type ImageOutputProps = {
    dataURI?: string;
    hideDataURI?: boolean;
    readOnlySvg?: boolean;
    onSvgChange?: (svg: string) => void;
};

export const ImageOutput: React.FC<ImageOutputProps> = (props) => {
    const { dataURI, hideDataURI = false, readOnlySvg = false, onSvgChange = () => {}} = props;
    const [ image, setImage ] = React.useState<HTMLImageElement | null>(null);

    // const svgSource = (svgProp ? svgProp : 
    //     (dataURI ? fromSVGDataURI(dataURI) : '')) ?? defaultSvg;

    const imageData = dataURI ? fromImageDataURI(dataURI) : null;

    // const svgCodec = completeCodec(SvgToBase64Codec);
    // const prettyPrintCodec = completeCodec(PrettyPrintXmlCodec);

    // const codecs = [
    //     svgCodec,
    //     prettyPrintCodec,
    // ];

    // const codec = makeCodecStack(...codecs);

    const [dataURIOutput, setDataURIOutput] = React.useState<string>('');
    // const [minimizedSvg, setMinimizedSvg] = React.useState<string>('');
    const [reactJsx, setReactJsx] = React.useState<string>('');
    const [reactTsx, setReactTsx] = React.useState<string>('');

    const update = async () => {

        setDataURIOutput(dataURI ?? '');

        // const jsx = await svgToJsxComponent(minimizedSvgValue);
        // const tsx = await svgToTsxComponent(minimizedSvgValue);
        const jsx = dataURI ? imageDataURIToReactJSX(dataURI) : '';
        const tsx = dataURI ? imageDataURIToReactTSX(dataURI) : '';

        setReactJsx(jsx);
        setReactTsx(tsx);

        const imageValue = dataURI ? fromImageDataURI(dataURI) : null;
        if (imageValue instanceof HTMLImageElement) {
            setImage(imageValue);
        } else {
            setImage(null);
        }
    };

    useEffect(() => {
        update();
    }, []);

    const viewerStyle: React.CSSProperties = {
        whiteSpace: 'pre-line',
        wordBreak: 'break-all',
        overflowWrap: 'anywhere',
    };

    return <>
        <Stack>

            {!hideDataURI && (
                <Stack>
                    <CopyInput readOnly disabled label="Data URI:" value={dataURIOutput} />
                </Stack>
            )}

            {image && (
                <Stack>
                    <Stack mx={200}>
                        <ResponsiveImage image={image} alt="Image" />
                    </Stack>
                </Stack>
            )}

            {/* Below the fold conversions */}
            {/* <Stack mt={20}>
                <Stack>
                    <Stack>
                        <Viewer label="React (JSX):" value={reactJsx} grammar="jsx" language="jsx" style={viewerStyle} />
                    </Stack>
                </Stack>

                <Stack>
                    <Stack>
                        <Viewer label="React (TSX):" value={reactTsx} grammar="tsx" language="tsx" style={viewerStyle} />
                    </Stack>
                </Stack>
            </Stack> */}

        </Stack>
    </>;
};
