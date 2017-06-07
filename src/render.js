const snabbdom = require('snabbdom')
const patch = snabbdom.init([ 
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/props').default, 
  require('snabbdom/modules/style').default,
  require('snabbdom/modules/eventlisteners').default
]);
const h = require('snabbdom/h').default

const omit = (o, fields) => Object.keys(o).reduce((a, b) => !fields.includes(b) ? Object.assign(a, {[b]: o[b]}) : a, {})

function vtree (tree) {
  const props = omit(tree, ['element', 'children', 'tagName'])
  const children = tree.children && tree.children.map(child => child.tagName ? vtree(child) : child)
  return h(tree.tagName, {props}, children)
}

function render (tree, node, oldTree) {
  const newTree = vtree(tree)
  if (oldTree) { patch(oldTree, newTree) } else { patch(node, newTree) }
  return newTree
}


module.exports = render