
import React, { useEffect } from 'react';

import get from 'lodash-es/get';
import set from 'lodash-es/set';

import { TextInput, Checkbox, Button, Group, Text, Slider, Select, Radio, RadioGroup, useMantineTheme, Box, Stack, ColorPicker, ColorInput, Input } from '@mantine/core';
import { useForm } from '@mantine/form';

import { WavyText, WavyTextOptions, makeWavyTextSvg, toStrokeWidth, wavyTextDefaults } from "../tools/WavyText";
import { Viewer } from '../components/Viewer';
import { code } from '../../node_modules/mdast-util-to-hast/lib/handlers/code.d';
import { CopyInput } from '../components/CopyInput';
import { minimizeXml } from '../conv/text/util/minimize';
import { toSVGDataURI } from '../conv/text/util/svgDataURI';

type OptionsFormProps<T> = { value: T; onChange: (value: T) => void; };

type WaveTextOptionsFormProps = OptionsFormProps<WavyTextOptions>;

// const ColorInput = ({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void; }) => {

//     return (
//         <Group gap="md">
//             <ColorPicker
//                 color={value}
//                 onChange={(color) => onChange(color)}
//             />
//             <TextInput
//                 label={label}
//                 value={value}
//                 onChange={(event) => onChange(event.currentTarget.value)}
//             />
//             {/* <Button size="xs" onClick={() => onChange('')}>Clear</Button> */}
//         </Group>
//     );
// };

const WavyTextOptionsForm: React.FC<WaveTextOptionsFormProps> = (props) => {
    const { value, onChange } = props;

    const form = useForm<WavyTextOptions>({
        initialValues: value,
        onValuesChange(values, previous) {
            console.info('Form values changed:', values)
            onChange(values);
        },
    });

    return (
        <Stack maw={340} mx="auto">
            <Stack gap="md">
                <TextInput
                    label="Text"
                    placeholder="Hello, World!"
                    value={form.values.text}
                    onChange={(event) => form.setFieldValue('text', event.currentTarget.value)}
                />
                <Input.Wrapper label="Font Size">
                    <Slider
                        value={form.values.fontSize}
                        onChange={(value) => form.setFieldValue('fontSize', value)}
                        min={9}
                        max={72}
                        step={1}
                    />
                </Input.Wrapper>
                <ColorInput
                    label="Fill"
                    placeholder="#339af0"
                    value={form.values.fill}
                    onChange={(value) => form.setFieldValue('fill', value)}
                />
                <ColorInput
                    label="Stroke"
                    placeholder="#b3b3b3"
                    value={form.values.stroke}
                    onChange={(value) => form.setFieldValue('stroke', value)}
                />
                <Slider
                    label="Stroke Width"
                    value={toStrokeWidth(form.values.sw)}
                    onChange={(value) => form.setFieldValue('sw', value)}
                    min={0.0670897}
                    max={0.134179}
                    step={0.001}
                />
                <ColorInput
                    label="Highlight 1"
                    placeholder="#ff0000"
                    value={form.values.highlight1}
                    onChange={(value) => form.setFieldValue('highlight1', value)}
                />
                <ColorInput
                    label="Highlight 2"
                    placeholder="#00ff00"
                    value={form.values.highlight2}
                    onChange={(value) => form.setFieldValue('highlight2', value)}
                />
            </Stack>
        </Stack>

    );
};

// export const WavyTextOptionsForm: React.FC<WaveTextOptionsFormProps> = (props) => {
//     const { value: optionsValue, onChange } = props;

//     const getOption = (key: string) => get(optionsValue, key);

//     const setOption = (key: string, value: any) => {
//         set(optionsValue, key, value);
//         onChange(optionsValue);
//     };

//     return (
//         <Stack maw={340} mx="auto">
//             <Stack gap="md">
//                 <TextInput
//                     label="Text"
//                     placeholder="Hello, World!"
//                     value={getOption('text')}
//                     onChange={(event) => setOption('text', event.currentTarget.value)}
//                 />
//                 <Input.Wrapper label="Font Size">
//                     <Slider
//                         label="Size"
//                         value={getOption('size')}
//                         onChange={(value) => setOption('size', value)}
//                         min={9}
//                         max={144}
//                         step={1}
//                     />
//                 </Input.Wrapper>
//                 <ColorInput
//                     label="Fill"
//                     placeholder="#339af0"
//                     value={getOption('fill')}
//                     onChange={(value) => setOption('fill', value)}
//                 />
//                 <ColorInput
//                     label="Stroke"
//                     placeholder="#b3b3b3"
//                     value={getOption('stroke')}
//                     onChange={(value) => setOption('stroke', value)}
//                 />
//                 <Slider
//                     label="Stroke Width"
//                     value={toStrokeWidth(getOption('sw'))}
//                     onChange={(value) => setOption('sw', value)}
//                     min={0.0670897}
//                     max={0.134179}
//                     step={0.001}
//                 />
//                 <ColorInput
//                     label="Highlight 1"
//                     placeholder="#ff0000"
//                     value={getOption('highlight1')}
//                     onChange={(value) => setOption('highlight1', value)}
//                 />
//                 <ColorInput
//                     label="Highlight 2"
//                     placeholder="#00ff00"
//                     value={getOption('highlight2')}
//                     onChange={(value) => setOption('highlight2', value)}
//                 />
//             </Stack>
//         </Stack>
//     );
// };


export const WavyTextPage = () => {
    const [options, setOptions] = React.useState<WavyTextOptions>(wavyTextDefaults());
    const [code, setCode] = React.useState<string>('');

    const [minimizedSvg, setMinimizedSvg] = React.useState<string>('');
    const [dataUri, setDataUri] = React.useState<string>('');

    const generate = () => {
        const gen = makeWavyTextSvg(options);
        setCode(gen);

        const minimizedSvgValue = minimizeXml(gen);
        setMinimizedSvg(minimizedSvgValue);

        const dataUriValue = toSVGDataURI(minimizedSvgValue);
        setDataUri(dataUriValue);
    };

    useEffect(() => { generate(); }, [options]);
    useEffect(() => { generate(); }, []);

    return (
        <Stack gap="md">
            <Text ta="center" fz="lg" lh="lg">Wavy Text</Text>
            <Stack gap="md" ta="center">
                <WavyText {...options} />
            </Stack>
            <Stack gap="md" mb={3}>
                <Text ta="center" fz="md" lh="md">Options</Text>
                <WavyTextOptionsForm value={options} onChange={setOptions} />
            </Stack>

            <Stack gap="md" ta="center">
                <CopyInput disabled value={dataUri} label="Data URI" />
            </Stack>
            <Stack gap="md" ta="center">
                <CopyInput disabled value={minimizedSvg} label="Minimized SVG" />
            </Stack>
            <Stack gap="md" ta="center">
                <Viewer value={code} language="xml" grammar="xml" label="Code" />
            </Stack>
        </Stack>
    );
};
