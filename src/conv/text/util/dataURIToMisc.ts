
export const dataURIToHtml = (dataURI: string, title?: string) => {
    
        return `<!DOCTYPE html>
<html>
<head>
    ${title ? `<title>${title}</title>` : ''}
</head>
<body>
    <img src="${dataURI}" alt="${title ?? 'Image'}" aria-label="${title ?? 'Image'}" />
</body>
</html>`;
    
};

export const dataURIToCss = (dataURI: string) => {

    return `div.image-container {
    background-image: url('${dataURI}');
}`;

};

export const dataURIToCssHtml = (dataURI: string, title?: string) => {
    const css = dataURIToCss(dataURI);

    return `<!DOCTYPE html>
<html>
<head>
    ${title ? `<title>${title}</title>` : ''}
    <style type="text/css">
        ${css}
    </style>
</head>
<body>
    <div class="image-container"></div>
</body>
</html>`;

};

export const dataURIToReactJSXComponent = (dataURI: string, title?: string): string => {
    const jsx = `import React from 'react';
    
export const ImageComponent = () => {
    return (
        <img src="${dataURI}" alt="${title ?? 'Image'}" aria-label="${title ?? 'Image'}" />
    );
};`;

    return jsx;
};

export const dataURIToReactTSXComponent = (dataURI: string, title?: string): string => {
    const tsx = `import React from 'react';
    
export const ImageComponent: React.FC = () => {
    return (
        <img src="${dataURI}" alt="${title ?? 'Image'}" aria-label="${title ?? 'Image'}" />
    );
};`;

    return tsx;
};
