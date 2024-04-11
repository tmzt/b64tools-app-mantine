
import React from 'react';

export type LogoProps = {
    style?: React.CSSProperties;
};

export const B64ToolsLogo: React.FC<LogoProps> = ({ style }) => {
    return (
        <svg width="450" height="150" version="1.1" viewBox="0 0 150 180.43"
            xmlns="http://www.w3.org/2000/svg" style={style}>
            <defs>
                <filter id="a" x="-.03" y="-.2" width="1.25" height="1.56" colorInterpolationFilters="sRGB"
                    overflow="display">
                    <feTurbulence lightingColor="#339AF0" baseFrequency=".04" numOctaves="5"
                        result="result4" type="fractalNoise" />
                    <feDisplacementMap in="SourceGraphic" in2="result4" result="result3" scale="10"
                        xChannelSelector="R" yChannelSelector="G" />
                    <feDiffuseLighting lightingColor="#b9c1c7" in="result4" result="result1"
                        surfaceScale="2">
                        <feDistantLight azimuth="235" elevation="40" />
                    </feDiffuseLighting>
                    <feComposite in="result3" in2="result1" operator="in" result="result2" />
                    <feComposite in2="result1" k1="1.7" operator="arithmetic" result="result5" />
                    <feBlend in="result5" in2="result3" mode="lighten" />
                </filter>
            </defs>
            <path transform="matrix(6.7754 0 0 7.7136 -258.46 -24.49)"
                d="m13.8 9.1334q-0.13522 1.4029-0.15212 3.3297 0.54087-0.70989 1.0986-0.99723 0.55777-0.28734 1.4029-0.28734 1.6902 0 2.6874 1.1832t0.99723 3.1438q0 2.1466-1.0648 3.4311-1.0479 1.2677-2.8396 1.2677-1.7409 0-2.5184-1.3015 0.06761 0.49016 0.06761 0.54087 0 0.60848-0.59158 0.60848t-0.59158-0.84511q0-0.23663 0.0169-0.35495 0-0.38875 0.0169-0.82821l0.05071-1.3015 0.0338-1.7071-0.0338-4.5129q-0.0169-0.62538-0.13522-0.84511-0.10141-0.21973-0.37185-0.21973-0.05071 0-0.43946 0.067609-0.18592 0.033804-0.32114 0.033804-0.57468 0-0.57468-0.54087 0-0.55777 0.67609-0.55777 0.20283 0 0.33804 0.016902l0.40565 0.050707q0.27044 0.033804 0.43946 0.033804 0.18592 0 0.52397-0.050707 0.33804-0.067609 0.50707-0.067609 0.37185 0 0.37185 0.47326zm-0.0169 4.9016q-0.11832 0.54087-0.11832 1.5212 0 1.6733 0.27044 2.2987 0.52397 1.2339 1.9945 1.2339 1.1663 0 1.8423-0.91272 0.69299-0.92962 0.69299-2.4846 0-1.5888-0.65919-2.4846-0.64228-0.91272-1.7747-0.91272-0.7944 0-1.4367 0.50707-0.64228 0.49016-0.81131 1.2339zm12.474-4.6481q-1.5212 0-2.4677 1.2846-0.94652 1.2677-1.0648 3.465 1.0648-1.8423 3.5157-1.8423 1.8423 0 3.0086 1.0817t1.1663 2.772q0 1.8085-1.2508 2.9748-1.2508 1.1663-3.2114 1.1663-2.1635 0-3.4142-1.4367-1.2339-1.4367-1.2339-3.9213 0-3.0593 1.3691-4.8509 1.3691-1.8085 3.6847-1.8085 1.4198 0 2.417 0.70989 0.99723 0.70989 0.99723 1.724 0 0.47326-0.33804 0.81131-0.32114 0.33804-0.7606 0.33804-0.35495 0-0.62538-0.25353-0.25353-0.27044-0.25353-0.64228 0-0.50707 0.47326-0.67609-0.50707-0.89582-2.0114-0.89582zm-0.25353 4.0565q-1.3691 0-2.1635 0.7606-0.7944 0.7437-0.7944 2.0283 0 1.3184 0.7944 2.1128 0.8113 0.7775 2.1466 0.7775 1.3015 0 2.1128-0.8113 0.82821-0.81131 0.82821-2.0959 0-1.2508-0.81131-2.0114-0.7944-0.7606-2.1128-0.7606zm12.896-3.972v5.8313h1.9945q0.55777 0 0.55777 0.57468t-0.59158 0.57468h-1.9607v1.031q0 1.4029 0.7606 1.4029 0.20283 0 0.55777-0.03381 0.35495-0.0338 0.35495-0.0338 0.70989 0 0.70989 0.57468 0 0.59158-0.60848 0.59158-0.37185 0-0.99723-0.10141-0.52397-0.08451-1.3015-0.08451-0.47326 0-1.4198 0.10141-0.94652 0.10141-1.4198 0.10141-0.64228 0-0.64228-0.57468 0-0.60848 0.7775-0.60848 0.16902 0 0.49016 0.0338 0.33804 0.03381 0.50707 0.03381 0.84511 0 0.84511-1.4029v-1.031h-5.2397q-0.7775 0-0.7775-0.67609 0-0.27044 0.18592-0.54087l4.4791-5.5608q0.70989-0.87891 1.0479-1.1324 0.33804-0.27044 0.7775-0.27044 0.91272 0 0.91272 1.2001zm-5.7637 5.8313h4.3777l0.11832-5.527zm11.172 4.9016q-0.43946 0-0.7437-0.30424-0.30424-0.32114-0.30424-0.7606 0-0.43946 0.30424-0.7437 0.30424-0.32114 0.7437-0.32114 0.43946 0 0.7437 0.32114 0.30424 0.30424 0.30424 0.7437 0 0.43946-0.30424 0.7606-0.30424 0.30424-0.7437 0.30424zm7.6229-2.6198 0.0338-1.0817q0.0169-0.69299 0.60848-0.69299 0.59158 0 0.59158 0.7775 0 1.8423-0.47326 2.5691-0.64228 0.98033-2.1128 0.98033-1.3522 0-1.9268-0.86201-0.42256-0.62538-0.42256-2.1297v-4.0565q0-0.35495-0.32114-0.35495h-0.54087q-0.27044 0-0.45636-0.16902-0.16902-0.18592-0.16902-0.43946 0-0.23663 0.16902-0.42256 0.18592-0.18592 0.40565-0.18592h0.65919q0.28734 0 0.28734-0.32114v-1.7409q0-0.64228 0.65919-0.64228 0.60848 0 0.60848 0.64228v1.8085q0 0.25353 0.30424 0.25353h1.8423q0.64228 0 0.64228 0.59158 0 0.62538-0.69299 0.62538h-1.8592q-0.23663 0-0.23663 0.35495v4.1579q0 1.7747 1.1663 1.7747 1.1832 0 1.2339-1.4367zm6.0003 2.6198q-1.7747 0-2.8396-1.217-1.0648-1.2339-1.0648-3.2959 0-2.0621 1.0648-3.279 1.0817-1.2339 2.8903-1.2339 1.8423 0 2.9072 1.2001 1.0648 1.2001 1.0648 3.2621 0 2.0621-1.0986 3.3128-1.0986 1.2508-2.9241 1.2508zm0.08451-7.9102q-1.1832 0-1.8592 0.82821t-0.7437 2.3494q0 0 0 0.21973 0 1.5888 0.65919 2.5015 0.67609 0.89582 1.8761 0.89582 1.2339 0 1.9269-0.89582 0.70989-0.91272 0.70989-2.5184 0-3.3804-2.5691-3.3804zm9.1441 7.9102q-1.7747 0-2.8396-1.217-1.0648-1.2339-1.0648-3.2959 0-2.0621 1.0648-3.279 1.0817-1.2339 2.8903-1.2339 1.8423 0 2.9072 1.2001 1.0648 1.2001 1.0648 3.2621 0 2.0621-1.0986 3.3128-1.0986 1.2508-2.9241 1.2508zm0.08451-7.9102q-1.1832 0-1.8592 0.82821t-0.7437 2.3494q0 0 0 0.21973 0 1.5888 0.65919 2.5015 0.67609 0.89582 1.8761 0.89582 1.2339 0 1.9269-0.89582 0.70989-0.91272 0.70989-2.5184 0-3.3804-2.5691-3.3804zm7.8933 0.55777 0.0169 5.2566q0.0169 0.86201 0.45636 0.86201 0.10141 0 0.42256-0.08451 0.20283-0.03381 0.27044-0.03381 0.55777 0 0.55777 0.57468 0 0.55777-0.69299 0.55777-0.27044 0-0.86201-0.06761t-0.91272-0.06761q-0.27044 0-0.8113 0.06761-0.54087 0.06761-0.7944 0.06761h-0.08451q-0.70989 0-0.70989-0.60848 0-0.52397 0.57468-0.52397 0.0338 0 0.11832 0 0.10141 0.0169 0.15212 0.0169 0.42256 0.06761 0.49016 0.06761 0.30424 0 0.37185-0.25353 0.08451-0.27044 0.10141-1.3691l0.0169-1.1832 0.05071-2.6198-0.0169-3.0086q-0.0169-0.50707-0.05071-0.67609-0.11832-0.38875-0.47326-0.38875-0.05071 0-0.43946 0.067609-0.18592 0.033804-0.30424 0.033804-0.57468 0-0.57468-0.54087 0-0.55777 0.67609-0.55777 0.18592 0 0.32114 0.016902l0.40565 0.050707q0.27044 0.033804 0.45636 0.033804 0.16902 0 0.50707-0.050707 0.33804-0.067609 0.50707-0.067609 0.38875 0 0.38875 0.49016 0 0.16902-0.0169 0.25353-0.11832 1.3015-0.11832 3.6847zm6.1524-1.6733q1.1324 0 1.893 0.59158v-0.06761q0-0.62538 0.54087-0.62538 0.55777 0 0.55777 0.54087 0 0.10141-0.0338 0.50707-0.06761 0.33804-0.06761 0.67609 0 0.20283 0.05071 0.59158 0.06761 0.38875 0.06761 0.59158 0 0.64228-0.55777 0.64228-0.54087 0-0.55777-0.54087l-0.0169-0.55777q-0.0169-0.50707-0.59158-0.86201-0.55777-0.37185-1.3184-0.37185-0.7775 0-1.3015 0.40565-0.52397 0.38875-0.52397 0.98033 0 1.0817 1.4874 1.2846l0.98033 0.13522q2.8734 0.38875 2.8734 2.3832 0 1.217-0.92962 1.9776-0.92962 0.7437-2.4339 0.7437-1.4029 0-2.4339-0.7944 0.0169 0.16902 0.0169 0.32114 0 0.60848-0.57468 0.60848-0.62538 0-0.62538-0.69299 0 0.11832 0.10141-0.87892 0.03381-0.23663 0.03381-0.47326 0-0.40565-0.06761-0.7606-0.06761-0.35495-0.06761-0.55777 0-0.59158 0.54087-0.59158 0.35495 0 0.43946 0.16902 0.10141 0.16902 0.11832 0.89582 0.0169 0.72679 0.7606 1.1832 0.7437 0.45636 1.893 0.45636 0.82821 0 1.3691-0.42256 0.54087-0.42256 0.54087-1.0648 0-1.1493-1.8254-1.3353-1.7409-0.18592-2.6536-0.67609-0.91272-0.50707-0.91272-1.7578 0-1.1832 0.89582-1.9099 0.89582-0.7437 2.3325-0.7437z"
                fill="#339af0" filter="url(#a)" imageRendering="optimizeQuality" stroke="#b3b3b3"
                strokeWidth=".06709" aria-label="b64.tools" />
        </svg>
    );
};