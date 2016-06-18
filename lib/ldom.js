const dom = {
  render (tree, node, document) {
    if (tree.tagName) {
      document = document || node.ownerDocument
      var element = document.createElement(tree.tagName)
      tree.children && tree.children.map(child => dom.render(child, element))
      Object.assign(element, omit(tree, ['children', 'tagName']))
      node.appendChild(element)
    } else {
      return node.innerText = tree
    }
  }
}

var pick = (o, fields) => Object.assign({}, fields.reduce((a, b) => Object.assign(a, {[b]: o[b]}), {}))

var omit = (o, fields) => Object.assign({}, Object.keys(o).reduce((a, b) => !fields.includes(b) && Object.assign(a, {[b]: o[b]}) || a, {}))

export default dom
