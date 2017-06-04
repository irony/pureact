const render = require('./render')
const createElement = require('./createElement')
const createStore = require('./createStore')

function Component() {
//  setState () { throw new Error('Unsupported. Use props instead of component state') }
}

module.exports = {
  render,
  createElement,
  createStore,
  Component
}
