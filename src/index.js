const render = require('./render')
const createElement = require('./createElement')
const createStore = require('./createStore')
const useState = require('./useState')
const useReducer = require('./useReducer')

function Component (props) {
  this.props = props
  this.setState = () => { throw new Error('Unsupported. Use useState instead') }
}
module.exports = {
  render,
  createElement,
  createStore,
  useState,
  useReducer,
  Component
}
