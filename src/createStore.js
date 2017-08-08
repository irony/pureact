module.exports = function createStore (reducer, initialState) {
  let state = initialState || {}
  const listeners = []
  const store = {
    getState: (action) => Object.assign({}, state, reducer(state, action || {})),
    dispatch: (action) => {
      // for thunks
      if (typeof action === 'function') return action(store.dispatch, store.getState)
      // for promises
      if (Promise.resolve(action) === action) return Promise.resolve(action).then(store.dispatch)
      state = store.getState(action)
      // first parameter is how to remove listener
      listeners.forEach((listener, i) => listener(() => { delete listeners[i] }))
    },
    subscribe: (callback) => listeners.push(callback)
  }
  if (initialState) setImmediate(store.dispatch)
  return store
}
