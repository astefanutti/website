import { sveltekit } from '@sveltejs/kit/vite';
import svelteSVG from "vite-plugin-svelte-svg";
import { imagetools } from 'vite-imagetools';

const supportedExtensions = ['png', 'jpg', 'jpeg'];

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    // https://github.com/rdela/sveltekit-imagetools
    imagetools({
      removeMetadata: true,
      defaultDirectives: (url) => {
        const extension = url.pathname.substring(url.pathname.lastIndexOf('.') + 1);
        if (supportedExtensions.includes(extension)) {
          return new URLSearchParams({
            format: 'avif;webp;' + extension,
            picture: true,
          });
        }
        return new URLSearchParams();
      }
    }),
    sveltekit(),
    svelteSVG({
      svgoConfig: {}, // See https://github.com/svg/svgo#configuration
      requireSuffix: false, // Set false to accept '.svg' without the '?component'
    }),
  ],
};

export default config;
