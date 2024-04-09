import React, { RefObject } from "react";

import { ActionIcon, TextInputProps, TextInput, Input, Stack } from "@mantine/core";

import { IconCopy } from '@tabler/icons-react';
import { useGlowOnChange } from "../hooks/useGlowOnChange";
import { CopyActionButton } from "./CopyActionButton";


export const CopyInput = (props: TextInputProps & { value?: string }) => {
  const value = props.value || props.defaultValue;

  const valueString = `${(value || '')}`;

  const copyAction = (
    <CopyActionButton value={valueString} />
  );

  const className = props.className ? `${props.className} glow` : 'glow';

  return useGlowOnChange((ref: RefObject<HTMLInputElement>) => {
    const { label, ...rest } = props;

    // return (
    //     <Input.Wrapper label={label}>
    //       <Stack gap={10} mt={2}>
    //         <TextInput ref={ref} {...rest} className={`${className} glowable`} rightSection={copyAction} />
    //       </Stack>
    //     </Input.Wrapper>
    // );

    return (
      <Stack gap={10} mt={2}>
        <TextInput ref={ref} {...rest} className={className} rightSection={copyAction} />
      </Stack>
    )

  }, [value]);
};
