import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import { getHighlighter, renderToHtml, loadTheme } from 'shiki';

import remarkAbbr from 'remark-abbr';
import math from 'remark-math';
import remarkFootnotes from 'remark-footnotes';
import sidenotes from './src/plugins/remark-sidenotes.js';

import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import katex from 'rehype-katex-svelte';

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

      return escapeHtml(renderToHtml(tokens, {
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
      }))
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
      behavior: 'wrap',
    }]
  ]
});

function escapeHtml(code) {
  return code.replace(
    /[{}`]/g,
    (character) => ({ '{': '&lbrace;', '}': '&rbrace;', '`': '&grave;' }[character]),
  );
}

export default config;
