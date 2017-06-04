const h = require('virtual-dom/h')
const patch = require('virtual-dom/patch')
const diff = require('virtual-dom/diff')
const create = require('virtual-dom/create-element')

const omit = (o, fields) => Object.assign({}, Object.keys(o).reduce((a, b) => !fields.indexOf(b) > -1 && Object.assign(a, {[b]: o[b]}) || a, {}))

function vtree (tree) {
  if (!tree || !tree.tagName) return h('', tree)
  const props = omit(tree, ['element', 'children', 'tagName'])
  const children = tree.children && tree.children.map(child => vtree(child))
  return h(tree.tagName, props, children)
}

module.exports = function render (tree, node, oldTree) {
  const newTree = vtree(tree)
  const rootNode = node.children[0]
  if (!rootNode) {
    const newNode = create(newTree)
    node.appendChild(newNode)
    return newTree
  } else {
    const patches = diff(oldTree, newTree)
    patch(rootNode, patches)
    return newTree
  }
}
