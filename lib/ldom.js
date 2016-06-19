var i = 0
const dom = {
  render (tree, node, document) {
    if (!tree.tagName) return Object.assign(node, {innerHTML: tree})

    // new node
    console.log(i++, tree)
    if (!tree.element) {
      document = document || node.ownerDocument
      var element = document.createElement(tree.tagName)
      tree.children && tree.children.map(child => dom.render(child, element, document))
      node.appendChild(element)
      tree.element = element
    }

    // existing node, apply all properties except read only ones
    Object.assign(tree.element, omit(tree, ['element', 'children', 'tagName']))
  }
}

var pick = (o, fields) => Object.assign({}, fields.reduce((a, b) => Object.assign(a, {[b]: o[b]}), {}))

var omit = (o, fields) => Object.assign({}, Object.keys(o).reduce((a, b) => !fields.includes(b) && Object.assign(a, {[b]: o[b]}) || a, {}))

export default dom
