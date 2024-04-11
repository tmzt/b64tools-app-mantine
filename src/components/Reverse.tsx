import React from "react";

import { ActionIcon, ActionIconProps, PolymorphicComponentProps } from "@mantine/core"

import ArrowsRightLeftIcon from '@heroicons/react/16/solid/ArrowsRightLeftIcon';

export type ReverseButtonProps = PolymorphicComponentProps<'button', ActionIconProps>;

export const ReverseButton: React.FC<ReverseButtonProps> = (props) => {
    return (
        <ActionIcon aria-label="reverse direction" title="Reverse direction of conversion" {...props}>
            <ArrowsRightLeftIcon />
        </ActionIcon>
    );
};
