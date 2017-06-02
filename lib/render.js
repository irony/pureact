const patch = require('vtree/vpatch')
const diff = require('vtree/diff')
const VNode = require('vtree/vnode')
const VText = require('vtree/vtext')
const create = require('vdom/create-element')

// TODO: get rid of these
let lastTree, rootNode
const omit = (o, fields) => Object.assign({}, Object.keys(o).reduce((a, b) => !fields.indexOf(b) > -1 && Object.assign(a, {[b]: o[b]}) || a, {}))

function vtree (tree) {
  if (!tree.tagName) return new VText(tree)
  const props = omit(tree, ['element', 'children', 'tagName'])
  const children = tree.children && tree.children.map(child => vtree(child))
  return new VNode(tree.tagName, props, children)
}

module.exports = function render (tree, node) {
  const newTree = vtree(tree)
  if (lastTree) {
    const patches = diff(lastTree, newTree)
    node = patch(rootNode, patches)
    lastTree = newTree
  } else {
    rootNode = create(newTree)
    node.appendChild(rootNode)
    lastTree = newTree
  }
}
