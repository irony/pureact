const user = (state = { name: 'World' }, action) => {
  switch (action.type) {
    case 'UPDATE_NAME': return Object.assign({}, state, { name: action.name })
    default: return state
  }
}

export default user
