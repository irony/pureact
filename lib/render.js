'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var snabbdom = require('snabbdom');
var patch = snabbdom.init([require('snabbdom/modules/class').default, require('snabbdom/modules/props').default, require('snabbdom/modules/style').default, require('snabbdom/modules/eventlisteners').default]);
var h = require('snabbdom/h').default;

var omit = function omit(o, fields) {
  return Object.keys(o).reduce(function (a, b) {
    return !fields.includes(b) ? Object.assign(a, _defineProperty({}, b, o[b])) : a;
  }, {});
};

function vtree(tree) {
  var props = omit(tree, ['element', 'children', 'tagName']);
  var children = tree.children && tree.children.map(function (child) {
    return child.tagName ? vtree(child) : child;
  });
  return h(tree.tagName, { props: props }, children);
}

function render(tree, node, oldTree) {
  var newTree = vtree(tree);
  if (oldTree) {
    patch(oldTree, newTree);
  } else {
    patch(node, newTree);
  }
  return newTree;
}

module.exports = render;