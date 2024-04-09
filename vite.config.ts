import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import alias from '@rollup/plugin-alias';
import virtual from '@rollup/plugin-virtual';


const APP_ENV = process.env.APP_ENV || 'development';

export const VITE_PORT = parseInt(process.env.VITE_PORT || '5173')

const isProd = APP_ENV === 'prod';

const baseHref = () => {
    if (APP_ENV == 'prod') {
        return 'https://base64.io';
    } else if (APP_ENV == 'beta') {
        return 'https://beta.base64.io';
    } else {
        return `http://localhost:${VITE_PORT}`;
    }
}


process.env.BASE_HREF_REL = '/';

const transformHtmlPlugin = (data: {[k: string]: string}) => ({
    name: 'transform-html',
    transformIndexHtml: {
        enforce: 'pre',
        transform(html) {
            return html.replace(
                /<%=\s*(\w+)\s*%>/gi,
                (match: any, p1: string) => data[p1] || ''
            );
        }
    }
});

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        transformHtmlPlugin({ baseHref: baseHref(), baseHrefRel: '/' }),
        // alias({
        //     'os': { EOL: '\n' },
        // })
        virtual({
            'os': 'export const EOL = "\\n";',
        }),
    ],
    define: {
        'process.env': process.env,
        'process.cwd': () => '',
    },
    mode: APP_ENV,
    build: {
        minify: isProd,
        cssMinify: isProd,
    },
    server: {
        host: true,
        port: VITE_PORT,
        hmr: {
            host: 'localhost',
            port: VITE_PORT,
        }
    },
    // base: './',
    base: baseHref(),
    // resolve: {
    //     alias: {
    //         buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
    //     }
    // }
    // build: {
    //     rollupOptions: {
    //         plugins: [inject({ Buffer: ['Buffer', 'Buffer'] })],
    //     },
    // }
    // resolve: {
    //     'os': { EOL: '\n' },
    // }
});
