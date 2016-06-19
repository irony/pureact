import user from './user'
export default { user }

const app = (state, action) => ({
  user: user(state.user, action)
})

export default app
