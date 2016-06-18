export function createStore (reducers, app, state) {
  state = state || {}
  const store = {
    getState: (action) => Object.assign({}, state, Object.keys(reducers).reduce((state, key) => Object.assign({}, reducers[key](action, state)), {})),
    dispatch: (action) => state = store.getState(action),
    subscribe: (callback) => reducers[Symbol(callback)] = callback
  }
  return store
}
