
export const toSVGDataURI = (input: string) => {
    try {
        return `data:image/svg+xml;base64,${btoa(input)}`;
    } catch (e) {
        console.info('Error encoding SVG to base64 data uri:', e);
        return input;
    }
};

export const fromSVGDataURI = (input: string) => {
    try {
        return atob(input.replace(/^data:image\/svg\+xml;base64,/, ''));
    } catch (e) {
        console.info('Error decoding SVG from base64 data uri:', e);
        return input;
    }
};
