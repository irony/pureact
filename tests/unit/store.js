const oboy = require('oboy')
const createStore = require('../../src/createStore')

oboy((expect, sinon) => {
  describe('store', () => {
    describe('with reducer', function () {
      const reducer = sinon.stub().returns({name: 'foo'})
      const store = createStore(reducer)

      it('create store', (done) => {
        store.subscribe(() => {
          expect(store.getState()).to.have.property('name')
          done()
        })
        store.dispatch()
      })
    })

    describe('with multiple reducers', function () {
      const user = sinon.stub().returns({name: 'foo'})
      const did = sinon.stub().returns({what: 'bar'})
      const reducer = (state, action) => ({user: user(), did: did()})

      it('create store', (done) => {
        const store = createStore(reducer)
        store.subscribe(() => {
          expect(store.getState()).to.have.property('user')
          expect(store.getState().user).to.have.property('name')
          expect(store.getState().user.name).to.eql('foo')
          done()
        })
        store.dispatch()
      })
    })

    describe('dispatch', function () {
      const reducer = sinon.stub().returns({name: 'foo'})
      const store = createStore(reducer)

      it('dispatches initial data', (done) => {
        reducer.returns({name: 'christian'})
        store.dispatch({type: 'EMPTY'})
        store.subscribe(() => {
          expect(store.getState()).to.have.property('name')
          expect(store.getState()).to.not.have.property('type')
          expect(store.getState().name).to.eql('christian')
          done()
        })
      })

      it('dispatches new data', (done) => {
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
            expect(store.getState().name).to.eql('elvis')
            expect(store.getState().last).to.eql('left the building')
            done()
          } catch (err) {
            done(err)
          }
        })
      })

      it('supports thunks', (done) => {
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
          expect(store.getState().name).to.eql('elvis')
          expect(store.getState().last).to.eql('left the building')
          done()
        })
        store.dispatch(action)
      })

      it('supports promises in actions', (done) => {
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
          expect(store.getState().name).to.eql('elvis')
          expect(store.getState().last).to.eql('left the building')
          done()
        })
        store.dispatch(action)
      })

      it('supports promises in state', (done) => {
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
            expect(store.getState().name).to.eql('elvis')
            expect(store.getState().last).to.eql('left the building')
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
})
