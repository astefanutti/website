export default ({ color, backgroundColor, inlineCodeBgColor }: Theme) => `

body.dark-mode {
  color: ${color};
  background-color: ${backgroundColor};
  font-weight: 200;
}

body.dark-mode strong {
  font-weight: 800;
}

body.dark-mode a.anchor > svg {
  fill: ${color};
}

body.dark-mode table {
  border-top: 2px solid ${color};
  border-bottom: 2px solid ${color};
}

body.dark-mode th {
  border-bottom: 1px solid ${color};
}

body.dark-mode code:not(.grvsc-code) {
  background-color: ${inlineCodeBgColor};
}

body.dark-mode .gatsby-code-title {
  background: ${inlineCodeBgColor};
}

body.dark-mode svg text.themed {
  fill: ${color};
}

body.dark-mode svg path.themed {
  stroke: ${color};
}

body.dark-mode svg path.themed[fill^="#"] {
  fill: ${color};
}

`
