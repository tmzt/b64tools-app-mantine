import React from "react";

import { ActionIcon } from "@mantine/core"

import ArrowsRightLeftIcon from '@heroicons/react/16/solid/ArrowsRightLeftIcon';

export const ReverseButton = () => {
    return (
        <ActionIcon aria-label="reverse direction" title="Reverse direction of conversion">
            <ArrowsRightLeftIcon />
        </ActionIcon>
    );
};
