
import { notifications } from '@mantine/notifications';

export const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);

    notifications.show({
        // title: 'Copied to clipboard',
        // message: text,
        message: 'Copied to clipboard',
        color: 'teal',
    });
};
