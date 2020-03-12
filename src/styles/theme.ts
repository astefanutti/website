import styled, { css, createGlobalStyle } from 'styled-components'

import tufte from './tufte'
import dark from './dark'
import toggle from './toggle'

require('typeface-jetbrains-mono')

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

  p, li {
    text-align: justify;
  }

  .sidenote, .marginnote {
    text-align: left;
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

pre.fullwidth > code {
  width: 100%;
}

.fullwidth {
    max-width: 100%;
}

pre > code {
  width: auto;
  overflow-x: scroll;
  font-family: 'JetBrains Mono';
}

.grvsc-container {
  clear: both;
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
  text-align: left;
}

// Katex
.katex .newline {
  height: 1em;
}

`

export const GlobalStyle = createGlobalStyle`
${tufte(theme.light)}
${dark(theme.dark)}
${toggle()}
${reset()}
`
