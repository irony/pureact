import {
  init,
  classModule,
  propsModule,
  styleModule,
  attributesModule,
  eventListenersModule,
  h,
} from 'snabbdom'

const patch = init([
  // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  attributesModule, // for setting attributes on DOM elements
  eventListenersModule, // attaches event listeners
])

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

export default function render(tree, node, oldTree) {
  const newTree = vtree(tree)
  if (oldTree) {
    patch(oldTree, newTree)
  } else {
    patch(node, newTree)
  }
  return newTree
}
