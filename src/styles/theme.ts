import styled, { css, createGlobalStyle } from 'styled-components'

import tufte from './tufte'
import dark from './dark'
import toggle from './toggle'

require('typeface-jetbrains-mono')

export { css, createGlobalStyle, styled }

export const theme = {
  colors: {
    black: '#000000',
    background: '#fffff8',
    contrast: '#111',
    contrastLightest: '#dad9d9',
    accent: 'red',
    white: '#ffffff',
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

/* Simulate Pandoc's table output styles */
table {
  border-top: 2px solid black;
  border-bottom: 2px solid black;
}

th {
  border-bottom: 1px solid black;
}

td, th {
  font-size: 1.2rem;
  padding: 10px;
  text-align: left;
}

`

export const GlobalStyle = createGlobalStyle`
${tufte()}
${dark()}
${toggle()}
${reset()}
`
