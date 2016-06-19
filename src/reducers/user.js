const initialState = { name: 'World' }
const user = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_NAME': return {...state, name: action.name }
    default: return state
  }
}

export default user
