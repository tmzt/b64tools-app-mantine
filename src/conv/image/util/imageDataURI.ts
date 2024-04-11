import { isImageBase64DataURI } from "../../text/util/dataURI";



export class ConversionError extends Error {
    public readonly userMessage: string;

    constructor(message: string) {
        super(`ConversionError: ${message}`);
        this.name = 'ConversionError';
        this.userMessage = message;
    }
}

export const fromImageDataURI = (dataURI: string): HTMLImageElement | ConversionError => {

    const v = isImageBase64DataURI(dataURI);
    if (v !== true) {
        return new ConversionError(`Not an image data URI: ${dataURI}`);
    }

    const image = new Image()
    image.src = dataURI;

    return image;
};

export const imageDataURIToReactJSX = (dataURI: string): string => {
    const image = fromImageDataURI(dataURI);
    if (image instanceof ConversionError) {
        return `// Error: ${image.userMessage}`;
    }

    const jsx = `<img src="${dataURI}" alt="Image" />`;

    return jsx;
};

export const imageDataURIToReactTSX = (dataURI: string): string => {
    const image = fromImageDataURI(dataURI);
    if (image instanceof ConversionError) {
        return `// Error: ${image.userMessage}`;
    }

    const tsx = `<img src="${dataURI}" alt="Image" />`;

    return tsx;
};
