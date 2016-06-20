import diff from 'vtree/diff'
import patch from 'vdom/patch'
import createElement from 'vdom/create-element'
import VText from 'vtree/vtext'
import VNode from 'vtree/vnode'

// TODO: get rid of these
var lastTree, rootNode

const dom = {
  vtree (tree) {
    if (!tree.tagName) return new VText(tree)
    var props = omit(tree, ['element', 'children', 'tagName'])
    var children = tree.children && tree.children.map(child => dom.vtree(child))
    return new VNode(tree.tagName, props, children)
  },
  render (tree, node) {
    var before = new Date()
    var vtree = dom.vtree(tree)
    if (lastTree) {
      var patches = diff(lastTree, vtree)
      console.log(`applied ${Object.keys(patches).length} patches`)
      node = patch(rootNode, patches)
      lastTree = vtree
    } else {
      rootNode = createElement(vtree)
      node.appendChild(rootNode)
      lastTree = vtree
    }
    console.log(`render in ${new Date() - before}ms`)
  }
}

var omit = (o, fields) => Object.assign({}, Object.keys(o).reduce((a, b) => !fields.includes(b) && Object.assign(a, {[b]: o[b]}) || a, {}))

export default dom
