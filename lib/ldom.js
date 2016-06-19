import {diff, patch} from 'virtual-dom'
import createElement from 'virtual-dom/create-element'
import VText from 'virtual-dom/vnode/vtext'
import VNode from 'virtual-dom/vnode/vnode'

var memory, rootNode

// const dom = {
//   render (tree, node, document) {
//     var element = createElement(tree)
//     if (memory) {
//       var patches = diff(memory, element)
//       patch(node, patches)
//     } else {
//       node.appendChild(element)
//       memory = element
//     }
//   }
// }

const dom = {
  vtree (tree) {
    if (!tree.tagName) return new VText(tree)
    var props = omit(tree, ['element', 'children', 'tagName'])
    var children = tree.children && tree.children.map(child => dom.vtree(child))
    return new VNode(tree.tagName, props, children)
  },
  render (tree, node) {
    var vtree = dom.vtree(tree)
    if (memory) {
      var patches = diff(memory, vtree)
      node = patch(rootNode, patches)
      memory = vtree
    } else {
      rootNode = createElement(vtree)
      node.appendChild(rootNode)
      memory = vtree
    }
  }
}

var pick = (o, fields) => Object.assign({}, fields.reduce((a, b) => Object.assign(a, {[b]: o[b]}), {}))

var omit = (o, fields) => Object.assign({}, Object.keys(o).reduce((a, b) => !fields.includes(b) && Object.assign(a, {[b]: o[b]}) || a, {}))

export default dom
