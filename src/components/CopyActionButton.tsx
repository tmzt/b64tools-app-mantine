
import React from 'react';

import { ActionIcon, ActionIconProps } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { IconCopy } from '@tabler/icons-react';


export type CopyActionButtonProps = ActionIconProps & { value?: string };

export const CopyActionButton: React.FC<CopyActionButtonProps> = (props) => {
    const { value = '', ...rest } = props;

    const onClick = () => {
        if (value?.length && 'undefined' !== typeof navigator.clipboard) {
            navigator.clipboard.writeText(value)
                .then(() => {
                    console.info('CopyActionButton: Copied to clipboard:', value);

                    notifications.show({
                        // title: 'Copied to clipboard',
                        message: 'Copied code to clipboard',
                        autoClose: 3000,
                    });
                })
        } else {
            console.info('CopyActionButton: No value to copy or clipboard API not available');
        }
    };

    return (
        <ActionIcon aria-label="copy" title="Copy to clipboard" {...rest} onClick={onClick}>
            <IconCopy />
        </ActionIcon>
    );
};
