
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
import { dataURIToCss, dataURIToCssHtml, dataURIToHtml, dataURIToReactJSXComponent, dataURIToReactTSXComponent } from "../conv/text/util/dataURIToMisc";



// const ResponsiveSvg = ({image, alt}: {image: HTMLImageElement, alt?: string}) => {

//     const aspectRatio = image.width / image.height;

//     return (
//         <AspectRatio ratio={aspectRatio}>
//             <img src={image.src} alt={alt} />
//         </AspectRatio>
//     );
// };

export type DataURIMiscOutputProps = {
    dataURI?: string;
};

export const DataURIMiscOutput: React.FC<DataURIMiscOutputProps> = (props) => {
    const { dataURI } = props;

    const [html, setHtml] = React.useState<string>('');
    const [css, setCss] = React.useState<string>('');
    const [htmlWithCss, setHtmlWithCss] = React.useState<string>('');
    const [reactJsx, setReactJsx] = React.useState<string>('');
    const [reactTsx, setReactTsx] = React.useState<string>('');

    const update = async (input: string) => {
        const htmlValue = dataURIToHtml(input);
        const cssValue = dataURIToCss(input);
        const htmlWithCssValue = dataURIToCssHtml(input);

        const jsx = await dataURIToReactJSXComponent(input);
        const tsx = await dataURIToReactTSXComponent(input);

        setHtml(htmlValue);
        setCss(cssValue);
        setHtmlWithCss(htmlWithCssValue);
        setReactJsx(jsx);
        setReactTsx(tsx);
    };

    useEffect(() => {
        if (dataURI) {
            update(dataURI);
        }
    }, [dataURI]);

    if (!dataURI) {
        return null;
    }

    return <>
        <Stack>

            {/* Below the fold conversions */}
            <Stack mt={20}>
                <Stack>
                    <Viewer label="HTML:" value={html} grammar="markup" language="html" />
                </Stack>

                <Stack>
                    <Viewer label="CSS:" value={css} grammar="css" language="css" />
                </Stack>

                <Stack>
                    <Viewer label="HTML (with CSS):" value={htmlWithCss} grammar="markup" language="html" />
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
