import { sveltekit } from '@sveltejs/kit/vite';
import svg from '@poppanator/sveltekit-svg';
import { imagetools } from 'vite-imagetools';

const supportedExtensions = ['png', 'jpg', 'jpeg'];

/** @type {import('vite').UserConfig} */
const config = {
  ssr: {
    noExternal: ['svelte-vega', 'vega-embed'],
  },
  plugins: [
    imagetools({
      removeMetadata: true,
      defaultDirectives: (url) => {
        const extension = url.pathname.substring(url.pathname.lastIndexOf('.') + 1);
        if (supportedExtensions.includes(extension)) {
          return new URLSearchParams({
            format: 'avif;webp;' + extension,
            as: 'picture',
          });
        }
        return new URLSearchParams();
      }
    }),
    sveltekit(),
    svg({
      svgoOptions: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeUselessDefs: false,
                removeHiddenElems: false,
                cleanupIds: false,
              },
            },
          },
        ],
      },
    }),
  ],
};

export default config;
