let state = []
let cursor = -1

function useContext(context) {
  const current = cursor++
  const store = (state[current] = state[current] || context)
  return { state: store.getState(), dispatch: store.dispatch.bind(store) }
}

// internal, only used for tests
useContext.__reset = () => {
  state = []
  cursor = []
  useContext.flush()
}

useContext.flush = () => (cursor = -1)

module.exports = useContext
