export function createStore (reducers, app, state) {
  state = state || {}
  var listeners = []
  const store = {
    getState: (action) => Object.assign({}, state, Object.keys(reducers).reduce((state, key) => Object.assign({}, state, reducers[key](action, state)), {})),
    dispatch: (action) => {
      state = store.getState(action)
      console.log('dispatch', action, state, reducers)
      listeners.forEach(l => l(action, state))
    },
    subscribe: (callback) => listeners.push(callback)
  }
  return store
}
