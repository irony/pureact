var patch = require('vtree/vpatch')
var diff = require('vtree/diff')
var VNode = require('vtree/VNode')
var VText = require('vtree/VText')
var create = require('vdom/create-element')

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
    var newTree = dom.vtree(tree)
    if (lastTree) {
      var patches = diff(lastTree, newTree)
      console.log(`applied ${Object.keys(patches).length} patches`)
      node = patch(rootNode, patches)
      lastTree = newTree
    } else {
      rootNode = create(newTree)
      node.appendChild(rootNode)
      lastTree = newTree
    }
    console.log(`render in ${new Date() - before}ms`)
  }
}

var omit = (o, fields) => Object.assign({}, Object.keys(o).reduce((a, b) => !fields.includes(b) && Object.assign(a, {[b]: o[b]}) || a, {}))

module.exports = dom
