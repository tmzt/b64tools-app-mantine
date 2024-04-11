
import { Stack, Text, Title, TextInput } from "@mantine/core";
import React from "react";
import { ReverseButton } from "../components/Reverse";
import { SvgOutput } from "../components/SvgOutput";
import { defaultSvgDataURI } from "../consts";
import { ImageOutput } from "../components/ImageOutput";
import { DataURIMiscOutput } from "../components/DataURIMiscOutput";
import { useNavigate } from "react-router-dom";


const isSvg = (dataUri: string): boolean => {
    return dataUri.startsWith('data:image/svg+xml');
};

export const DataURIToImage = () => {

    const navigate = useNavigate();
    const [dataURIInput, setDataURIInput] = React.useState<string>(defaultSvgDataURI);

    return <>
        <Stack>
            <Title>Data URI to Image <ReverseButton onClick={() => navigate('/image-to-data-uri')} /></Title>
            <Text size="sm">Enter a Data URI to convert to an image. The image will not leave your computer.</Text>

            <Stack>
                <TextInput label="Data URI:" value={dataURIInput} onChange={(e: any) => setDataURIInput(e.currentTarget.value)} />
            </Stack>

            {isSvg(dataURIInput) && (
                <SvgOutput dataURI={dataURIInput} hideDataURI={true} />
            ) || <>
                <ImageOutput dataURI={dataURIInput} hideDataURI={true} />
                <DataURIMiscOutput dataURI={dataURIInput} />
            </>}

        </Stack>
    </>;
};
