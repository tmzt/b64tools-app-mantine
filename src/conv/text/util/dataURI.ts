

const PREFIX = /data:(?<mimeType>[a-z]+\/[a-z]+);(?<encoding>[a-z0-9]+),?/;

export type DataURIProperties = {
    mimeType?: string;
    encoding?: string;
};

export const getDataURIProperties = (dataURI: string): DataURIProperties | null => {
    if (!dataURI) {
        return null;
    }

    const [prefix, data] = dataURI.split(',');
    if (!prefix) {
        return null;
    }

    const m = PREFIX.exec(prefix);

    return m?.groups ?? null;
};

export const isImageBase64DataURI = (dataURI: string): boolean | null => {
    // const mimeType = getMimeType(dataURI);
    const properties = getDataURIProperties(dataURI);
    if (!properties) {
        return null;
    }

    if (!properties.mimeType?.startsWith('image/')) {
        return false;
    }

    if (properties.encoding !== 'base64') {
        return false;
    }

    return true;
};

export const isSvgBase64DataURI = (dataURI: string): boolean | null => {
    const properties = getDataURIProperties(dataURI);
    if (!properties) {
        return null;
    }

    if (properties.mimeType !== 'image/svg+xml') {
        return false;
    }

    if (properties.encoding !== 'base64') {
        return false;
    }

    return true;
};

