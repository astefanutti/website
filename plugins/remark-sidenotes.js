const getSlug = require('speakingurl')
const visit = require('unist-util-visit')
const select = require('unist-util-select')
const toHAST = require('mdast-util-to-hast')
const toHTML = require('hast-util-to-html')

const MARGINNOTE_SYMBOL = '{-}'

function sidenotes() {
  return transformer
}

const generateInputId = (isMarginNote, title) =>
  `${isMarginNote ? 'md' : 'sd'}-${getSlug(title, { truncate: 50 })}`

const getReplacement = ({ isMarginNote, noteHTML }, notesAst) => {
  const inputId = generateInputId(isMarginNote, noteHTML)
  const labelCls = `margin-toggle ${isMarginNote ? '' : 'sidenote-number'}`
  const labelSymbol = isMarginNote ? '&#8853;' : ''
  const noteTypeCls = isMarginNote ? 'marginnote' : 'sidenote'

  if (isMarginNote) {
    notesAst[0].value = notesAst[0].value.substring(4)
    if (!notesAst[0].value) {
      notesAst.slice(1)
    }
  }

  const span = {
    type: 'span',
    children: notesAst,
    data: {
      hName: 'span',
      hProperties: {
        className: noteTypeCls,
      },
    },
  }

  visit(span, 'image', (node) => {
    node.sizes = '(max-width: 760px) 100vw, (min-width: 760px) 25vw, 760px'
  })

  return [
    {
      type: 'jsx',
      value: `<label for="${inputId}" class="${labelCls}">${labelSymbol}</label>`,
    },
    {
      type: 'jsx',
      value: `<input type="checkbox" id="${inputId}" class="margin-toggle" />`,
    },
    span,
  ]
}

const coerceToHtml = nodeArray =>
  nodeArray.map(node => toHTML(toHAST(node))).join('') || ''

const extractNoteFromHtml = note => {
  const matches = note.match(/(\s+)*({-})*\s*((.|\n)+)/)

  return {
    isMarginNote: matches[2] === MARGINNOTE_SYMBOL,
    noteHTML: matches[3],
  }
}

function transformer(tree) {
  // "Regular" Sidenotes/Marginnotes consisting of a reference and a definition
  // Syntax for Sidenotes [^<number>] and somewhere else [^<number]: <markdown>
  // Syntax for Marginnotes [^<descriptor>] and somewhere else [^<descriptor]: {-}
  visit(tree, 'footnoteReference', (node, index, parent) => {
    const target = select(
      tree,
      `footnoteDefinition[identifier=${node.identifier}]`
    )

    if (!target.length) throw new Error('No coresponding note found')

    const notesAst =
      target[0].children.length && target[0].children[0].type === 'paragraph'
        ? target[0].children[0].children
        : target[0].children

    const nodeDetail = extractNoteFromHtml(coerceToHtml(notesAst))

    parent.children.splice(index, 1, ...getReplacement(nodeDetail, notesAst))
  })

  visit(tree, 'footnoteDefinition', (node, index, parent) => {
    parent.children.splice(index, 1)
  })
  // "Inline" Sidenotes which do not have two parts
  // Syntax: [^{-} <markdown>]
  visit(tree, 'footnote', (node, index, parent) => {
    const notesAst = node.children
    const nodeDetail = extractNoteFromHtml(coerceToHtml(notesAst))

    parent.children.splice(index, 1, ...getReplacement(nodeDetail))
  })
}

module.exports = sidenotes
