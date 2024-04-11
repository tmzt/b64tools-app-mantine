import React from "react";

import { AspectRatio } from "@mantine/core";


export type ResponsiveImageProps = {
    image?: HTMLImageElement;
    src?: string;
    alt?: string;
    ['aria-label']?: string;
};

export const ResponsiveImage: React.FC<ResponsiveImageProps>  = (props) => {
    const { image: imageProp, src, ...rest } = props;

    const newImage = (src: string) => {
        const image = new Image();
        image.src = src;
        return image;
    }

    const image = imageProp ?? (src ? newImage(src ?? '') : undefined);
    if (!image) {
        return null;
    }

    const aspectRatio = image.width / image.height;

    return (
        <AspectRatio ratio={aspectRatio}>
            <img src={image.src} {...rest} />
        </AspectRatio>
    );
};
