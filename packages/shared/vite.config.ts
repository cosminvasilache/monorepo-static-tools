import { UserConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { createHtmlPlugin } from 'vite-plugin-html';

export const makeConfig = () => {
  return {
    root: './src',

    envDir: '../',
    envPrefix: ['VITE_'],

    build: {
      outDir: '../dist',
      emptyOutDir: true,
      minify: true,
      cssMinify: true,
      modulePreload: {
        polyfill: false,
      },
    },

    server: {
      open: true,
    },

    plugins: [
      createHtmlPlugin({
        minify: true,
      }),
      viteSingleFile({}),
    ],

  } satisfies UserConfig;
}
