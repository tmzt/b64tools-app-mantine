import { dataURIToCss, dataURIToCssHtml } from "./dataURIToMisc";
import { minimizeXml } from "./minimize";
import { toSVGDataURI } from "./svgDataURI";


export const svgToHtml = (input: string, title?: string) => {
    return `<!DOCTYPE html>
<html>
<head>${title ? `<title>${title}</title>` : ''}</head>
<body>
    ${input}
</body>
</html>`;

};

export const svgToCss = (input: string) => {
    const minimized = minimizeXml(input);
    const dataURI = toSVGDataURI(minimized);

    return dataURIToCss(dataURI);
}

export const svgToCssHtml = (input: string, title?: string) => {
    const minimized = minimizeXml(input);
    const dataURI = toSVGDataURI(minimized);

    return dataURIToCssHtml(dataURI, title);
};
