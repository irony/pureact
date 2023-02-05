const snabbdom = require('snabbdom')
const patch = snabbdom.init([
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/props').default,
  require('snabbdom/modules/style').default,
  require('snabbdom/modules/attributes').default,
  require('snabbdom/modules/eventlisteners').default,
])
const h = require('snabbdom/h').default
const omit = (o, fields) =>
  Object.keys(o).reduce(
    (a, b) => (!fields.includes(b) ? Object.assign(a, { [b]: o[b] }) : a),
    {}
  )
const shadowRoot = (child) => h('span', {}, child.map(deflate)) // Should be replaced with reference to parent instead?
const deflate = (child) =>
  child
    ? Array.isArray(child)
      ? shadowRoot(child)
      : child.tagName
      ? vtree(child)
      : child
    : ''
function vtree(tree) {
  const props = omit(tree, ['element', 'children', 'style', 'tagName'])
  const children = tree.children && tree.children.map(deflate)
  return h(
    tree.tagName,
    {
      props,
      style: tree.style,
      attrs: props.attrs || (props.properties || {}).attributes,
    },
    children
  )
}
function render(tree, node, oldTree) {
  const newTree = vtree(tree)
  if (oldTree) {
    patch(oldTree, newTree)
  } else {
    patch(node, newTree)
  }
  return newTree
}
module.exports = render
