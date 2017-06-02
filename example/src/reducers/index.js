import user from './user'

const app = (state, action) => ({
  user: user(state.user, action)
  // ... add more here
})

export default app
