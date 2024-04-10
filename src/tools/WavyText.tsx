
import React from "react";


export type WavyTextOptions = {
    text?: string;
    size?: number;
    fontSize?: number;
    style?: React.CSSProperties;
    fill?: string;
    stroke?: string;
    sw?: number | string;
    highlight1?: string;
    highlight2?: string;
};

export type WavyTextProps = WavyTextOptions;

export const DEFAULT_STROKE_WIDTH = 0.0670897;
export const THIN_STROKE_WIDTH = 0.0670897;
export const THICK_STROKE_WIDTH = 0.134179;

export const DEFAULT_FILL = "#339af0";
export const DEFAULT_STROKE = "#b3b3b3";

export const DEFAULT_HIGHLIGHT1 = "#339af0";
export const DEFAULT_HIGHLIGHT2 = "#b9c1c7";

export const toStrokeWidth = (value?: number | string): number => {
    if ('number' === typeof value) {
        return value;
    }

    if ('string' === typeof value) {
        switch (value) {
            case 'thin':
                return THIN_STROKE_WIDTH;
            case 'thick':
                return THICK_STROKE_WIDTH;
            // default:
            //     return parseFloat(value);
        }

        if (value.endsWith('px')) {
            return parseFloat(value) / 150;
        }

        // if (value.endsWith('em')) {
        //     return parseFloat(value) * 0.0670897;
        // }

        // if (value.endsWith('rem')) {
        //     return parseFloat(value) / 16.0;
        // }
    }

    return DEFAULT_STROKE_WIDTH;
};

export const wavyTextDefaults = (): WavyTextOptions => ({
    text: 'Hello, World!',
    size: 300,
    fontSize: 16,
    fill: DEFAULT_FILL,
    stroke: DEFAULT_STROKE,
    sw: DEFAULT_STROKE_WIDTH,
    highlight1: '#339af0',
    highlight2: '#b9c1c7',
});

const makeTextStyles = (props: WavyTextProps): React.CSSProperties => {
    const { size = 300, fontSize = 16, sw = DEFAULT_STROKE_WIDTH, fill = "#339af0", stroke = "#b3b3b3", highlight1 = "" } = props;

    return {
        // fontSize: `${size / 17.7}px`,
        fontSize: `${fontSize}pt`,
        fontFamily: "\" American Typewriter\"",
        fill,
        stroke,
        strokeWidth: sw,
        filter: "url(#a)",
        imageRendering: "crisp-edges",
    };
}

const makeTextStylesCss = (props: WavyTextProps): string => {
    const { size = 300, fontSize = 16, sw = DEFAULT_STROKE_WIDTH, fill = "#339af0", stroke = "#b3b3b3", highlight1 = "" } = props;

    const styles = {
        // ['font-size']: `${size / 17.7}px`,
        ['font-size']: `${fontSize}pt`,
        ['font-family']: "'American Typewriter'",
        ['fill']: fill,
        ['stroke']: stroke,
        ['stroke-width']: sw,
        ['filter']: "url(#a)",
        ['image-rendering']: "crisp-edges",
    };

    return Object.entries(styles).map(([key, value]) => `${key}:${value}`).join(';');
}

export const makeWavyTextSvg = (props: WavyTextProps): string => {
    const { text = 'Hello, World!', size = 300, fill = "#339af0", stroke = "#b3b3b3", sw = DEFAULT_STROKE_WIDTH, highlight1 = DEFAULT_HIGHLIGHT1, highlight2 = DEFAULT_HIGHLIGHT2 } = props;

    const textStyles = makeTextStylesCss(props);

    return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="150" viewBox="0 0 800 150" style="width: 100%; height: auto;">
    <defs>
        <filter id="a" width="1.25" height="1.56" x="-.03" y="-.2" overflow="display">
            <feTurbulence baseFrequency=".04" lightingColor="${highlight1}" numOctaves="5"
                result="result4" type="fractalNoise" />
            <feDisplacementMap in="SourceGraphic" in2="result4" result="result3" scale="10"
                xChannelSelector="R" yChannelSelector="G" />
            <feDiffuseLighting in="result4" lightingColor="${highlight2}" result="result1"
                surfaceScale="2">
                <feDistantLight azimuth="235" elevation="40" />
            </feDiffuseLighting>
            <feComposite in="result3" in2="result1" operator="in" result="result2" />
            <feComposite in2="result1" k1="1.7" operator="arithmetic" result="result5" />
            <feBlend in="result5" in2="result3" mode="lighten" />
        </filter>
    </defs>
    <text aria-label="${text}" x="0" y="80" style="${textStyles}">
        <tspan x="0" y="80">${text}</tspan>
    </text>
</svg>`;
};

export const WavyText: React.FC<WavyTextProps> = (props) => {
    const { text = 'Hello, World!', style, size = 300, highlight1 = DEFAULT_HIGHLIGHT1, highlight2 = DEFAULT_HIGHLIGHT2 } = props;

    const textStyles = makeTextStyles(props);

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="800" height="150" viewBox="0 0 800 150" style={{minWidth: '800px', minHeight: '150px', ...style}}>
            <defs>
                <filter id="a" width="1.25" height="1.56" x="-.03" y="-.2" overflow="display">
                    <feTurbulence baseFrequency=".04" lightingColor={highlight1} numOctaves="5"
                        result="result4" type="fractalNoise" />
                    <feDisplacementMap in="SourceGraphic" in2="result4" result="result3" scale="10"
                        xChannelSelector="R" yChannelSelector="G" />
                    <feDiffuseLighting in="result4" lightingColor={highlight2} result="result1"
                        surfaceScale="2">
                        <feDistantLight azimuth="235" elevation="40" />
                    </feDiffuseLighting>
                    <feComposite in="result3" in2="result1" operator="in" result="result2" />
                    <feComposite in2="result1" k1="1.7" operator="arithmetic" result="result5" />
                    <feBlend in="result5" in2="result3" mode="lighten" />
                </filter>
            </defs>
            <text aria-label={text} x="0" y="80" style={textStyles}>
                <tspan x="0" y="80">{text}</tspan>
            </text>
        </svg>
    );
};
