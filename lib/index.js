'use strict';

var render = require('./render');
var createElement = require('./createElement');
var createStore = require('./createStore');

function Component() {
  //  setState () { throw new Error('Unsupported. Use props instead of component state') }
}

module.exports = {
  render: render,
  createElement: createElement,
  createStore: createStore,
  Component: Component
};