import styled, { css, createGlobalStyle } from 'styled-components'

import tufte from './tufte'
import dark from './dark'
import toggle from './toggle'

export { css, createGlobalStyle, styled }

export const theme = {
  dark: {
    color: '#ddd',
    backgroundColor: '#333',
  },
  light: {
    color: '#111',
    backgroundColor: '#fffff8',
  },
}

const reset = () => `

@font-face {
  font-family: 'JetBrains Mono';
  src: url('/JetBrainsMono.woff2') format('woff2-variations');
  src: url('/JetBrainsMono.ttf') format('truetype-variations');
  font-weight: 1 999;
  font-display: block;
  font-style: normal;
}

@font-face {
  font-family: 'JetBrains Mono';
  src: url('/JetBrainsMono-Italic.woff2') format('woff2-variations');
  src: url('/JetBrainsMono-Italic.ttf') format('truetype-variations');
  font-weight: 1 999;
  font-display: block;
  font-style: italic;
}

html {
  font-size: 13px;
}

body {
  font-family: 'JetBrains Mono', monospace;
  overflow-wrap: anywhere;
}

:root {
  --main-width: 60%;
  --grvsc-border-radius: 0px;
}

a {
  text-decoration-thickness: 0.05em;
}

a.anchor, a.anchor:hover, a.anchor:link {
  background: none !important;
}

.navigation a {
  text-decoration: none;
}

@media (min-width: 760px) {
  body {
    width: auto;
    padding-right: 10%;
  }

  // Katex
  .katex-display {
    width: var(--main-width);
  }
}

.sidenote,
.marginnote {
    margin-bottom: 2em;
}

code, pre > code {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 300;
  font-size: 1.1rem;
}

.liquid {
  clear:unset;
  overflow-x: auto;
}

pre > code {
  width: auto;
  overflow-x: scroll;
}

.grvsc-container {
  // clear: both;
}

@media (max-width: 760px) {
  figure {
    max-width: 100%;
  }

  pre.fullwidth > code {
    width: 100%;
  }

  .fullwidth {
      max-width: 100%;
  }
}

figure {
  a.gatsby-resp-image-link {
    background: none;
  }

  span.gatsby-resp-image-wrapper {
    max-width: 100% !important;
  }
}

article .excerpt {
  display: none;
}

// Simulate Pandoc's table output styles
table {
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  margin-top: 2rem;
  margin-bottom: 3rem;
}

th {
  border-bottom: 1px solid black;
}

td, th {
  font-size: 1.2rem;
  padding: 10px;
}

// Katex
.katex .newline {
  height: 1em;
}

// Plotly
.js-plotly-plot .plotly svg {
  overflow: visible !important;
}

`

export const GlobalStyles = createGlobalStyle`
${tufte(theme.light)}
${dark(theme.dark)}
${toggle()}
${reset()}
`
