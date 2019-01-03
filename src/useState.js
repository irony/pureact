let state = []
let cursor = -1

function useState(initialState) {
  const current = cursor++
  const setter = (value) => {
    state[current] = typeof value === 'function' ? value() : value
    if (useState.dispatch) useState.restart() || useState.dispatch() // if connected to a store, notify the store
  }
  return [state[current] || initialState, setter]
}

useState.reset = () => {
  state = []
  cursor = []
  useState.restart()
}

useState.restart = () => { 
  cursor = -1
}

module.exports = useState
