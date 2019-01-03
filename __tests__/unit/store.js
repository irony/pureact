const createStore = require('../../src/createStore')

describe('store', () => {
  describe('with reducer', function () {
    const reducer = jest.fn( () => ({name: 'foo'}))
    const store = createStore(reducer)

    test('create store', (done) => {
      store.subscribe(() => {
        expect(store.getState()).toHaveProperty('name')
        done()
      })
      store.dispatch()
    })
  })

  describe('with multiple reducers', function () {
    const user = jest.fn( () => ({name: 'foo'}))
    const did = jest.fn( () => ({what: 'bar'}))
    const reducer = (state, action) => ({user: user(), did: did()})

    test('create store', (done) => {
      const store = createStore(reducer)
      store.subscribe(() => {
        expect(store.getState()).toHaveProperty('user')
        expect(store.getState().user).toHaveProperty('name')
        expect(store.getState().user.name).toEqual('foo')
        done()
      })
      store.dispatch()
    })
  })

  describe('dispatch', function () {
    const reducer = jest.fn( () => ({name: 'foo'}))
    const store = createStore(reducer)

    test('dispatches initial data', (done) => {
      reducer.mockReturnValue({name: 'christian'})
      store.dispatch({type: 'EMPTY'})
      store.subscribe(() => {
        expect(store.getState()).toHaveProperty('name')
        expect(store.getState()).not.toHaveProperty('type')
        expect(store.getState().name).toEqual('christian')
        done()
      })
    })

    test('dispatches new data', (done) => {
      const reducer = (state, action) => {
        switch (action.type) {
          case 'LEAVING': return {
            name: action.name,
            last: `${action.did} the ${action.what}`
          }
        }
        return state
      }
      const store = createStore(reducer)
      const action = { type: 'LEAVING', name: 'elvis', did: 'left', what: 'building' }
      store.dispatch(action)
      store.subscribe(() => {
        try {
          expect(store.getState().name).toEqual('elvis')
          expect(store.getState().last).toEqual('left the building')
          done()
        } catch (err) {
          done(err)
        }
      })
    })

    test('supports thunks', (done) => {
      const reducer = (state, action) => {
        switch (action.type) {
          case 'LEAVING': return {
            name: action.name,
            last: `${action.did} the ${action.what}`
          }
        }
        return state
      }
      const store = createStore(reducer)
      const action = (dispatch) => dispatch({ type: 'LEAVING', name: 'elvis', did: 'left', what: 'building' })
      store.subscribe(() => {
        expect(store.getState().name).toEqual('elvis')
        expect(store.getState().last).toEqual('left the building')
        done()
      })
      store.dispatch(action)
    })

    test('supports promises in actions', (done) => {
      const reducer = (state, action) => {
        switch (action.type) {
          case 'LEAVING': return {
            name: action.name,
            last: `${action.did} the ${action.what}`
          }
        }
        return state
      }
      const store = createStore(reducer)
      const action = new Promise((resolve) => resolve({ type: 'LEAVING', name: 'elvis', did: 'left', what: 'building' }))
      store.subscribe(() => {
        expect(store.getState().name).toEqual('elvis')
        expect(store.getState().last).toEqual('left the building')
        done()
      })
      store.dispatch(action)
    })

    test('supports promises in state', (done) => {
      const reducer = (state, action) => {
        switch (action.type) {
          case 'LEAVING': return Promise.resolve({
            name: action.name,
            last: `${action.did} the ${action.what}`
          })
          default: return state
        }
      }
      const store = createStore(reducer)
      store.subscribe(() => {
        try {
          expect(store.getState().name).toEqual('elvis')
          expect(store.getState().last).toEqual('left the building')
          done()
        } catch (err) {
          done(err)
        }
      })
      const action = { type: 'LEAVING', name: 'elvis', did: 'left', what: 'building' }
      store.dispatch(action)
    })
  })
})
