import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { defineMDSveXConfig as defineConfig, escapeSvelte } from 'mdsvex';
import { getHighlighter, renderToHtml, loadTheme } from 'shiki';

import remarkAbbr from 'remark-abbr';

import remarkFootnotes from 'remark-footnotes';
import sidenotes from './src/plugins/remark-sidenotes.js';

import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import math from 'remark-math';
import katex from 'rehype-katex-svelte';

import { fromHtml } from 'hast-util-from-html';

const config = defineConfig({
  extensions: ['.svelte.md', '.md', '.svx'],

  highlight: {
    highlighter: async function highlighter(code, lang, meta) {
      const dirname = path.dirname(fileURLToPath(import.meta.url));
      const theme = await loadTheme(path.join(dirname, 'src', 'themes', 'theme.json'));
      const clang = JSON.parse(fs.readFileSync(path.join(dirname, 'src', 'languages', 'c.tmLanguage.json'), 'utf-8'));

      const shikiHighlighter = await getHighlighter({
        theme: theme,
        langs: [clang, "glsl", "go", "powershell", "diff", "json", "yaml", "ini"],
      });

      shikiHighlighter.setColorReplacements({
        '#ABB2BF': 'var(--shiki-color-text)',
        '#D19A66': 'var(--shiki-token-constant)',
        '#98C379': 'var(--shiki-token-string)',
        '#7F848E': 'var(--shiki-token-comment)',
        '#C678DD': 'var(--shiki-token-keyword)',
        '#E06C75': 'var(--shiki-token-parameter)',
        '#61AFEF': 'var(--shiki-token-function)',
        '#000011': 'var(--shiki-token-punctuation)',
        '#56B6C2': 'var(--shiki-token-symbol)',
        '#000013': 'var(--shiki-token-operator)',
        '#000014': 'var(--shiki-token-variable)',
        '#000015': 'var(--shiki-token-member)',
        '#000016': 'var(--shiki-token-numeric)',
      });

      const tokens = shikiHighlighter.codeToThemedTokens(code, lang);

      const html = escapeSvelte(renderToHtml(tokens, {
        elements: {
          pre({ className, style, children }) {
            return `<pre class="${className} language-${lang}">${children}</pre>`
          },
          code({ children }) {
            return `<code tabindex="0">${children}</code>`
          },
          // token({ style, children, token }) {
          //   console.log(JSON.stringify(token));
          //   return `<span style="${style}">${children}</span>`;
          // },
          // customize line to add line number and highlight current line
          // line({ className, index, children }) {
          //   const shallHighlight = highlightLines.includes(index)
          //   return `<span class="${className} ${shallHighlight ? 'highlighted-line' : ''}"><span class="line-number">${index + 1}</span>${children}</span>`
          // },
        }
      }));

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
