export { default as render } from './render.mjs'
export { default as createElement } from './createElement.mjs'
export { default as createStore } from './createStore.mjs'
export { default as useState } from './useState.mjs'
export { default as useReducer } from './useReducer.mjs'
export { default as useContext } from './useContext.mjs'

import render from './render.mjs'
import createElement from './createElement.mjs'
import createStore from './createStore.mjs'
import useState from './useState.mjs'
import useReducer from './useReducer.mjs'
import useContext from './useContext.mjs'

export function Component(props) {
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
