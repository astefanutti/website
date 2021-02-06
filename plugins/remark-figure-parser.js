const unified = require('unified')
const parser = require('remark-parse')
const footnotes = require('remark-footnotes')

const FIGURE_OPENING_TAG = '<figure'
const OPENING_TAG = /<figure([^>]*)>/
const CLOSING_TAG = '</figure>'

function tufteFigureParser() {
  var parser = this.Parser

  if (!isRemarkParser(parser)) {
    throw new Error('Missing parser, cannot attach `remark-figure`')
  }

  var proto = parser.prototype
  proto.blockTokenizers.tufteFigure = figureTokenizer
  proto.blockMethods.splice(
    proto.blockMethods.indexOf('html'),
    0,
    'tufteFigure'
  )

  function locator(value, fromIndex) {
    const assertOpeningTag = value.match(OPENING_TAG)
    if (!assertOpeningTag) return

    const openingTag = assertOpeningTag[0]
    return value.indexOf(openingTag, fromIndex)
  }

  function figureTokenizer(eat, value, silent) {
    if (!value.startsWith(FIGURE_OPENING_TAG)) return

    const openingTagMatches = value.match(OPENING_TAG)
    const openingTag = openingTagMatches[0]
    const endTagPosition = value.indexOf(CLOSING_TAG, openingTagMatches.index)
    if (endTagPosition === -1) return

    const endPosition = endTagPosition + CLOSING_TAG.length
    const figureBlock = value.slice(0, endPosition)
    const children = parseMarkdown(
      value.slice(openingTagMatches.index + openingTag.length, endTagPosition)
    )

    /* Exit with true in silent mode after successful parse - never used (yet) */
    if (silent) {
      return true
    }

    return eat(figureBlock)({
      type: 'tufteFigure',
      attributes: {
        openingHtml: openingTag,
        closingHtml: CLOSING_TAG,
      },
      children,
    })
  }
  figureTokenizer.locator = locator
}

function parseMarkdown(markdown) {
  const result = unified()
    .use(parser/* , { commonmark: true, footnotes: true } */)
    .use(footnotes, { inlineNotes: true })
    .parse(markdown)

  if (result.type === 'root') {
    if (result.children[0].type === 'paragraph') {
      let children = result.children[0].children
      result.children.shift()
      children = children.concat(result.children);
      return children
    } else {
      return result.children
    }
  }

  return result
}

function isRemarkParser(parser) {
  return Boolean(
    parser &&
    parser.prototype &&
    parser.prototype.inlineTokenizers &&
    parser.prototype.inlineTokenizers.break &&
    parser.prototype.inlineTokenizers.break.locator
  )
}

module.exports = tufteFigureParser
