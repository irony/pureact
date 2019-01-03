let state = []
let cursor = -1

function useState(initialState) {
  const current = cursor++
  const setter = (value) => {
    state[current] = typeof value === 'function' ? value() : value
    if (useState.dispatch) Promise.resolve(state[current]).then(() => useState.restart() && useState.dispatch())
  }
  return [state[current] || initialState, setter]
}

// internal, only used for tests
useState.__reset = () => {
  state = []
  cursor = []
  useState.restart()
}

useState.restart = () => cursor = -1

module.exports = useState
