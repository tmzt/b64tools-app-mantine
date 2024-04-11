
import React, { useEffect } from "react";

import { FileInput, Stack, Text, Title } from "@mantine/core";
import { NotificationData, notifications } from "@mantine/notifications";

import { ReverseButton } from "../components/Reverse";
import { useNavigate } from "react-router-dom";
import { ImageOutput } from "../components/ImageOutput";
import { DataURIMiscOutput } from "../components/DataURIMiscOutput";
import { set } from "lodash";


export const ImageToDataURI = () => {
    const navigate = useNavigate();
    const [image, setImage] = React.useState<HTMLImageElement | undefined>(undefined);
    const [dataUri, setDataUri] = React.useState<string>('');

    const [error, setError] = React.useState<NotificationData | undefined>(undefined);
    const [notificationId, setNotificationId] = React.useState<string>('');

    useEffect(() => {
        if (error) {
            if (notificationId) {
                // Already showing an error
                return;
            }

            setNotificationId(notifications.show({
                title: 'Error processing data',
                color: 'red',
                timeout: 5000,
                ...error,
                onClose: () => {
                    setError(undefined);
                },
            }));
        } else {
            if (notificationId) {
                notifications.hide(notificationId);
            }
            setNotificationId('');
        }
    }, [error, notificationId]);

    const processBlob = (blob: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
            setDataUri(reader.result as string);

            const img = new Image();
            img.src = reader.result as string;
            setImage(img);
        };
        reader.readAsDataURL(blob);
    };

    const processUpload = (file: File | null) => {
        setDataUri('');
        setImage(undefined);

        if (!file) {
            setError({
                title: 'No file selected',
                message: 'Please select an image file to process',
            });

            return;
        }

        processBlob(file);
    };

    return (
        <Stack>
            <Title>Image to Data URI <ReverseButton  onClick={() => navigate('/data-uri-to-image')} /></Title>
            <Text size="sm">Upload a file to process (the file will not leave your computer).</Text>

            <Stack>
                <FileInput label="Select an image file:" onChange={processUpload} />
            </Stack>

            {image && <>
                <Stack mt={40}>
                    <ImageOutput dataURI={dataUri} />
                    <DataURIMiscOutput dataURI={dataUri} />
                </Stack>
            </>}
        </Stack>
    );
};
