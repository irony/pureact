const render = require('./render')
const createElement = require('./createElement')
const createStore = require('./createStore')
const useState = require('./useState')
const useReducer = require('./useReducer')
const useContext = require('./useContext')
const createContext = require('./createContext')

function Component (props) {
  this.props = props
  this.setState = () => { throw new Error('Unsupported. Use hooks/useState instead') }
}
module.exports = {
  render,
  createElement,
  createStore,
  createContext,
  useState,
  useReducer,
  useContext,
  Component
}
