import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { defineMDSveXConfig as defineConfig, escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';

import remarkAbbr from 'remark-abbr';

import remarkFootnotes from 'remark-footnotes';
import sidenotes from './src/plugins/remark-sidenotes.js';

import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import math from 'remark-math';
import katex from './src/plugins/rehype-katex-svelte.js';

import { fromHtml } from 'hast-util-from-html';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const theme = JSON.parse(fs.readFileSync(path.join(dirname, 'src', 'themes', 'theme.json'), 'utf-8'));

const COLOR_REPLACEMENTS = {
  '#282c34': 'var(--shiki-color-background)',
  '#abb2bf': 'var(--shiki-color-text)',
  '#d19a66': 'var(--shiki-token-constant)',
  '#98c379': 'var(--shiki-token-string)',
  '#7f848e': 'var(--shiki-token-comment)',
  '#c678dd': 'var(--shiki-token-keyword)',
  '#e06c75': 'var(--shiki-token-parameter)',
  '#61afef': 'var(--shiki-token-function)',
  '#000011': 'var(--shiki-token-punctuation)',
  '#56b6c2': 'var(--shiki-token-symbol)',
  '#000013': 'var(--shiki-token-operator)',
  '#000014': 'var(--shiki-token-variable)',
  '#000015': 'var(--shiki-token-member)',
  '#000016': 'var(--shiki-token-numeric)',
};

const highlighter = await createHighlighter({
  themes: [theme],
  langs: ['glsl', 'go', 'diff', 'json', 'yaml', 'ini', 'c', 'shell', 'python'],
});

const config = defineConfig({
  extensions: ['.svelte.md', '.md', '.svx'],

  highlight: {
    highlighter: async (code, lang = 'text', meta = '') => {
      const html = escapeSvelte(
        highlighter.codeToHtml(code, {
          lang,
          theme: 'One Dark Pro',
          colorReplacements: COLOR_REPLACEMENTS,
          meta: { __raw: meta },
          transformers: [
            {
              name: 'custom-mdsvex',
              pre(node) {
                const raw = this.options.meta?.__raw || '';
                const classMatch = raw.match(/class="([^"]+)"/);
                const extraClass = classMatch ? classMatch[1] : '';

                node.properties.class += ` language-${lang}`;
                if (extraClass) {
                  node.properties.class += ` ${extraClass}`;
                }

                node.properties.style = (node.properties.style || '')
                  .replace(/background-color:[^;]+/, 'background-color:var(--shiki-color-background)');
              },
              code(node) {
                node.properties.tabindex = '0';
              },
              line(node) {
                if (this.options.lang !== 'shell') return;
                const first = node.children[0];
                const firstText = first?.children?.[0]?.value || '';
                if (firstText === '$') {
                  first.children[0].value = '$ ';
                  first.properties = { class: 'shell-prompt' };
                  const second = node.children[1];
                  if (second?.children?.[0]?.value?.startsWith(' ')) {
                    second.children[0].value = second.children[0].value.slice(1);
                  }
                } else {
                  const text = node.children
                    .map((c) => c.children?.[0]?.value || c.value || '')
                    .join('');
                  if (text.trim()) {
                    node.properties.class = (node.properties.class || '') + ' shell-output';
                  }
                }
              },
            },
          ],
        })
      );

      return `{@html \`${html}\` }`;
    },
  },

  smartypants: {
    dashes: 'oldschool',
  },

  remarkPlugins: [
    math,
    remarkAbbr,
    [remarkFootnotes, {
      inlineNotes: true,
    }],
    sidenotes,
  ],

  rehypePlugins: [
    katex,
    rehypeSlug,
    [rehypeAutolinkHeadings, {
      behavior: 'prepend',
      properties: { class: 'anchor', ariaHidden: true, tabIndex: -1 },
      content: fromHtml('<svg viewBox="0 0 16 16" version="1.1" aria-hidden="true"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path></svg>', { fragment: true }),
    }]
  ]
});

export default config;
