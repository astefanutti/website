export default ({color, backgroundColor}: Theme) => `

body.dark-mode {
  color: ${color};
  background-color: ${backgroundColor};
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

`
