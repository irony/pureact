import store from '../store'

export function updateName (name) {
  return store.dispatch({
    type: 'UPDATE_NAME',
    name
  })
}
