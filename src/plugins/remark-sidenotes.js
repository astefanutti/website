import { visit } from 'unist-util-visit'
import { select } from 'unist-util-select'

const MARGINNOTE_SYMBOL = '{-} ';

function sidenotes() {
  return transformer;
}

const getReplacement = (notesAst, isMarginNote, id) => {
  const span = {
    type: 'span',
    note: true,
    children: notesAst.children,
    data: {
      hName: 'span',
      hProperties: {
        className: 'note ' + (isMarginNote ? 'marginnote' : 'sidenote'),
      },
    },
  }

  if (isMarginNote) {
    return [
      span,
    ];
  } else {
    const number = {
      type: 'span',
      children: [{
        type: 'text',
        value: id,
      }],
      data: {
        hName: 'span',
        hProperties: {
          className: 'sidenote-number',
        },
      },
    };
    span.children.splice(0, 0, number);
    return [
      number,
      span,
    ];
  }
}

function transformer(tree) {
  // "Regular" Sidenotes/Marginnotes consisting of a reference and a definition
  // Syntax for Sidenotes [^<number>] and somewhere else [^<number]: <markdown>
  // Syntax for Marginnotes [^<descriptor>] and somewhere else [^<descriptor]: {-}
  visit(tree, 'footnoteReference', (node, index, parent) => {
    const target = select(
      `footnoteDefinition[identifier=${node.identifier}]`,
      tree,
    );

    if (!target) throw new Error('No corresponding note found');

    const notesAst = target.children.length && target.children.type === 'paragraph'
      ? target.children.children[0]
      : target.children[0];

    const isMarginNote = notesAst.children[0].value == MARGINNOTE_SYMBOL;
    if (isMarginNote) {
      notesAst.children = notesAst.children.slice(1);
    }

    // parent.children.splice(index, 1, ...getReplacement(notesAst, isMarginNote));
    const replacement = getReplacement(notesAst, isMarginNote, node.identifier);
    const i = parent.children.findIndex(c => c.type !== 'span' || !c.note);
    if (replacement.length === 2) {
      parent.children.splice(index, 1, replacement[0]);
      parent.children.splice(i, 0, replacement[1]);
    } else {
      parent.children.splice(index, 1);
      parent.children.splice(i, 0, replacement[0]);
    }
  })

  visit(tree, 'footnoteDefinition', (node, index, parent) => {
    parent.children.splice(index, 1);
  })

  // "Inline" Sidenotes which do not have two parts
  // Syntax: ^[<markdown>]
  visit(tree, 'footnote', (node, index, parent) => {
    parent.children.splice(index, 1, ...getReplacement(node, true));
  })
}

export default sidenotes
