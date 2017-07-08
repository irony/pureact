module.exports = function createStore (reducer, initialState) {
  let state = initialState || {}
  const listeners = []
  const store = {
    getState: (action) => Object.assign({}, state, reducer(state, action || {})),
    dispatch: (action) => {
      state = store.getState(action)
      listeners.forEach((listener, i) => listener(() => { delete listeners[i] }))
    },
    subscribe: (callback) => listeners.push(callback)
  }
  setTimeout(store.dispatch) // start store automatically
  return store
}
