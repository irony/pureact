module.exports = function createStore (reducer, initialState) {
  let state = initialState || {}
  let promisedState = state
  const listeners = []
  const store = {
    getState: () => state,
    dispatch: (action) => {
      // for thunks
      if (typeof action === 'function') return action(store.dispatch, store.getState)
      // for promises
      if (Promise.resolve(action) === action) return Promise.resolve(action).then(store.dispatch)
      promisedState = Promise.resolve(promisedState).then(state => reducer(state, action || {}))
      return Promise.resolve(promisedState).then(result => {
        state = result
        listeners.forEach((listener, i) => listener(() => { delete listeners[i] }))
      })
    },
    subscribe: (callback) => listeners.push(callback)
  }
  if (initialState) setImmediate(store.dispatch)
  return store
}
/*

  1: login
  2: ändra användarnamn
  3. login igen
  4. svaret från 1
  5. svaret från 3

*/
