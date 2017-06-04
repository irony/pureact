'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var h = require('virtual-dom/h');
var patch = require('virtual-dom/patch');
var diff = require('virtual-dom/diff');
var create = require('virtual-dom/create-element');

var omit = function omit(o, fields) {
  return Object.assign({}, Object.keys(o).reduce(function (a, b) {
    return !fields.indexOf(b) > -1 && Object.assign(a, _defineProperty({}, b, o[b])) || a;
  }, {}));
};

function vtree(tree) {
  if (!tree || !tree.tagName) return h('', tree);
  var props = omit(tree, ['element', 'children', 'tagName']);
  var children = tree.children && tree.children.map(function (child) {
    return vtree(child);
  });
  return h(tree.tagName, props, children);
}

module.exports = function render(tree, node, oldTree) {
  var newTree = vtree(tree);
  var rootNode = node.children[0];
  if (!rootNode) {
    var newNode = create(newTree);
    node.appendChild(newNode);
    return newTree;
  } else {
    var patches = diff(oldTree, newTree);
    patch(rootNode, patches);
    return newTree;
  }
};