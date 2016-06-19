import store from '../store'

export function updateName (id, name) {
  return store.dispatch({
    type: 'UPDATE_NAME',
    id,
    name
  })
}
