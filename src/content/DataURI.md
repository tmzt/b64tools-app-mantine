
# How to use a Data URI to embed an image in a web page

## What is a Data URI?

A *Data URI* is a special form of <abbr title="Uniform Resource Identifier (a way of identifying a resource in a hypertext system, like the World Wide Web. A URL is a type of URI.)">URI</abbr> (also includes <abbr title="Uniform Resource Locator (what you use to access the site, such as google.com or https://google.com)">URLs</abbr>) which has the data directly embedded in the URI.

Data URIs are often used to [embed an image](/image-to-data-uri) in a web page or CSS stylesheet to remove the need for another server request.

## How to embed an image in a web page

An example of an embedded image in a web page:

```html
<img src="data:" title="This image is embedded" alt="This image is embedded" />
```

