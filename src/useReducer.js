const createStore = require('./createStore')
let state = []
let cursor = -1

function useReducer(reducer, initialState) {
  const current = cursor++
  const store = state[current] = (state[current] || initialState.dispatch ? initialState : createStore(reducer, initialState))
  return [store.getState(), store.dispatch.bind(store)]
}

// internal, only used for tests
useReducer.__reset = () => {
  state = []
  cursor = []
  useReducer.flush()
}

useReducer.flush = () => cursor = -1

module.exports = useReducer
