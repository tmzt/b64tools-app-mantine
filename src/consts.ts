
const vitePort = process.env.VITE_PORT || 5173;

export const baseHref = process.env.BASE_HREF || `http://localhost:${vitePort}`;
export const baseRel = '/';

export const defaultSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle class="cls-1" cx="50" cy="50" r="40" style="fill: blue; stroke: red;" />
</svg>`;

export const defaultSvgDataURI = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48Y2lyY2xlIGNsYXNzPSJjbHMtMSIgY3g9IjUwIiBjeT0iNTAiIHI9IjQwIiBzdHlsZT0iZmlsbDogYmx1ZTsgc3Ryb2tlOiByZWQ7IiAvPjwvc3ZnPg==`;
