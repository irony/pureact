const render = require('./render')
const createElement = require('./createElement')
const createStore = require('./createStore')
const useState = require('./useState')

function Component (props) {
  this.props = props
  this.setState = () => { throw new Error('Unsupported. Use hooks/useState instead') }
}
module.exports = {
  render,
  createElement,
  createStore,
  useState,
  Component
}
