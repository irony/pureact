const render = require('./lib/render')
const createElement = require('./lib/createElement')
const createStore = require('./lib/createStore')

function Component() {
//  setState () { throw new Error('Unsupported. Use props instead of component state') }
}

module.exports = {
  render,
  createElement,
  createStore,
  Component
}
