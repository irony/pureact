export function createStore (reducer, initialState) {
  var state = initialState || {}
  var listeners = []
  const store = {
    getState: (action) => Object.assign({}, state, reducer(state, action || {})),
    dispatch: (action) => {
      state = store.getState(action)
      listeners.forEach((listener, i) => listener(unsubscribe => { delete listeners[i] }))
    },
    subscribe: (callback) => listeners.push(callback)
  }
  return store
}
