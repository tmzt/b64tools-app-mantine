
import React, { useEffect } from "react";

import { Stack, Table, TableCaption, Text, TextInput, Title } from "@mantine/core";

import { SvgOutput } from "../components/SvgOutput";
import { ImageOutput } from "../components/ImageOutput";
import { DataURIMiscOutput } from "../components/DataURIMiscOutput";
import { DataURIProperties, getDataURIProperties } from "../conv/text/util/dataURI";


const PropertiesOutput = ({properties}: {properties: DataURIProperties}) => {
    return (
        <Stack>
            <Title>Data URI Properties</Title>
            <Stack>
                {/* <Text size="sm">MIME Type: {properties.mimeType}</Text> */}
                {/* <Text size="sm">Encoding: {properties.encoding}</Text> */}
                {/* <Text size="sm">Data: {properties.data}</Text> */}
                <Table>
                    <tbody>
                        <tr>
                            <td>MIME Type</td>
                            <td>{properties.mimeType}</td>
                        </tr>
                        <tr>
                            <td>Encoding</td>
                            <td>{properties.encoding}</td>
                        </tr>
                        {/* <tr>
                            <td>Data</td>
                            <td>{properties.data}</td>
                        </tr> */}
                    </tbody>
                </Table>
            </Stack>
        </Stack>
    );
}

export const AnalyzeDataURI = () => {
    const [dataURIInput, setDataURIInput] = React.useState<string>('');
    const [properties, setProperties] = React.useState<DataURIProperties | null>(null);

    useEffect(() => {
        setProperties(getDataURIProperties(dataURIInput));
    }, [dataURIInput]);

    return (
        <Stack>
            <Title>Analyze Data URI</Title>
            <Text size="sm">Enter a Data URI to analyze it. The data will not leave your computer.</Text>

            <Stack>
                <TextInput label="Data URI:" value={dataURIInput} onChange={(e: any) => setDataURIInput(e.currentTarget.value)} />
            </Stack>

            {properties && (
                <Stack mt={10} mb={20}>
                    <PropertiesOutput properties={properties} />
                </Stack>
            )}

            {dataURIInput &&  properties?.mimeType?.startsWith('image/') && <>
                {(properties?.mimeType?.startsWith('image/svg+xml')) ? (
                    <SvgOutput dataURI={dataURIInput} hideDataURI={true} />
                ) : (
                    <ImageOutput dataURI={dataURIInput} hideDataURI={true} />
                )}
                <DataURIMiscOutput dataURI={dataURIInput} />
            </>}
        </Stack>
    );
};
