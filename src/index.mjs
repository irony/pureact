import render from './render.mjs'
import createElement from './createElement.mjs'
import createStore from './createStore.mjs'
import useState from './useState.mjs'
import useReducer from './useReducer.mjs'
import useContext from './useContext.mjs'

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
