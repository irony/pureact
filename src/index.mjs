export { default as render } from './render.mjs'
export { default as createElement } from './createElement.mjs'
export { default as createStore } from './createStore.mjs'
export { default as useState } from './useState.mjs'
export { default as useReducer } from './useReducer.mjs'
export { default as useContext } from './useContext.mjs'

function Component(props) {
  this.props = props
  this.setState = () => {
    throw new Error('Unsupported. Use hooks/useState instead')
  }
}

export default {
  render,
  createElement,
  createStore,
  useState,
  useReducer,
  useContext,
  Component,
}
