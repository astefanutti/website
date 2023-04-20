import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { importAssets } from 'svelte-preprocess-import-assets';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],

  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [
    vitePreprocess(),
    mdsvex(mdsvexConfig),
    importAssets({
      sources: (defaultSources) => {
        return [
          ...defaultSources,
          {
            tag: 'Image',
            srcAttributes: ['src']
          }
        ];
      }
    }),
  ],

  kit: {
    adapter: adapter({ strict: false })
  }
};

export default config;
