'use strict';

var render = require('./lib/render');
var createElement = require('./lib/createElement');
var createStore = require('./lib/createStore');

function Component() {
  //  setState () { throw new Error('Unsupported. Use props instead of component state') }
}

module.exports = {
  render: render,
  createElement: createElement,
  createStore: createStore,
  Component: Component
};