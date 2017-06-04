'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function ljsx(tagName, props, children) {
  console.log(typeof tagName === 'undefined' ? 'undefined' : _typeof(tagName), tagName.constructor.name);
  if (typeof tagName === 'function') {
    var Component = tagName;
    var component = new Component(props);
    return component.render ? component.render() : component;
  }
  children = Array.prototype.slice.call(arguments, 2);
  return Object.assign({ tagName: tagName }, props, { children: children });
};