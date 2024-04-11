
import React, { useEffect } from "react";

import { Button, FileInput, Stack, Text, TextInput, Title } from "@mantine/core";
import { NotificationData, notifications } from "@mantine/notifications";

import { ReverseButton } from "../components/Reverse";
import { useNavigate } from "react-router-dom";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { ImageOutput } from "../components/ImageOutput";
import { DataURIMiscOutput } from "../components/DataURIMiscOutput";


export const ImageToDataURI = () => {
    const navigate = useNavigate();
    // const [dataUri, setDataUri] = React.useState<string>('');
    const [image, setImage] = React.useState<HTMLImageElement | undefined>(undefined);
    const [imageUri, setImageUri] = React.useState<string>('');

    const [error, setError] = React.useState<NotificationData | undefined>(undefined);
    const [notificationId, setNotificationId] = React.useState<string>('');

    useEffect(() => {
        if (error) {
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

    const processUpload = (file: File | null) => {
        if (!file) {
            setError({
                title: 'No file selected',
                message: 'Please select an image file to process',
            });

            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target?.result as string;
            setImage(img);
        };

        reader.readAsDataURL(file);
    };

    const fetchImage = () => {
        if (!imageUri) {
            setError({
                title: 'No URL selected',
                message: 'Please select an image URL to process',
            });

            return;
        }

        const image = new Image();
        image.onload = () => {
            setImage(image);
        };
        image.src = imageUri;
    };

    return (
        <Stack>
            <Title>Image to Data URI <ReverseButton  onClick={() => navigate('/data-uri-to-image')} /></Title>
            <Text size="sm">Enter a URL or select a file to process (the file will not leave your computer).</Text>

            <Stack>
                <TextInput label="Image URL:" value={imageUri} onChange={(e) => setImageUri(e.currentTarget.value)} />
                <Button onClick={fetchImage}>Fetch image</Button>
            </Stack>

            <Stack ta="center">
                <em>&mdash; or &mdash;</em>
            </Stack>

            <Stack>
                <FileInput label="Select an image file:" onChange={processUpload} />
            </Stack>

            {image && <>
                <Stack mt={40}>
                    <ImageOutput dataURI={image.src} />
                    <DataURIMiscOutput dataURI={image.src} />
                </Stack>
            </>}
        </Stack>
    );
};
