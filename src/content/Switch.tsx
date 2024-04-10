import React from "react";

import { Text } from "@mantine/core";
// import { DataURI } from "./DataURI";
import DataURI from "./DataURI.md";

import "../styles/markdown.css";


export const ContentSwitch = ({ uri }: { uri?: string }) => {
    const locPath = ('object' === typeof window) ? window.location.pathname : '';
    const curPath = (uri ? new URL(uri).pathname : locPath);

    const trimmedPath = curPath.replace(/\/+$/, '');

    const notFound = () => <></>;

    if (!trimmedPath?.length) {
        return notFound();
    }

    switch (trimmedPath) {
        case '/image-to-data-uri':
        case '/svg-to-data-uri':
            return <DataURI />
        default:
            return notFound();
    }
};
