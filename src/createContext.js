const createStore = require('./createStore')
const createElement = require('./createElement')

module.exports = function createContext (initialState, initialStore) {
  const Provider = (tagName, props, children) => {
    const store = props.store || initialStore
    return children.map(child => createElement(child, {...props, dispatch: store.dispatch, state: store.getState()}, child.children))
  }
  return {subscribe: store.subscribe, Provider}
}