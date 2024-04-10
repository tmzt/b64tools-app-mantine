
import { Text, Title } from '@mantine/core'
import React from 'react'

export const DataURI = () => {

    return <>
        <Title order={1}>How to use a Data URI</Title>
        <Text>
            A <em>Data URI</em> is a special form of <abbr title="Uniform Resource Identifier (a way of identifying a resource in a hypertext system, like the World Wide Web. A URL is a type of URI.)">URI</abbr> (also includes <abbr title="Uniform Resource Locator (what you use to access the site, such as google.com or https://google.com)">URLs</abbr>) which has the data directly embedded in the URI. It is often used to <a href="/image-to-data-uri">embed an image</a> in a web page or CSS stylesheet to remove the need for another server request.
        </Text>
    </>
};
