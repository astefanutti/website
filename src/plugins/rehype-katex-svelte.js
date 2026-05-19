import { selectAll } from 'hast-util-select'
import { toString } from 'hast-util-to-string'
import { fromString } from 'hast-util-from-string'
import Katex from 'katex'

export default function rehypeKatexSvelte(options = {}) {
  return (tree) => {
    for (const node of selectAll('.math-inline,.math-display', tree)) {
      const displayMode = node.properties?.className?.includes('math-display')
      const rendered = Katex.renderToString(toString(node), { ...options, displayMode })
      fromString(node, `{@html ${JSON.stringify(rendered)}}`)
    }
  }
}
