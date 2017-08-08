const oboy = require('oboy')
const createStore = require('../../src/createStore')

oboy((expect, sinon) => {
  describe('store', () => {
    describe('with reducer', function () {
      const reducer = sinon.stub().returns({name: 'foo'})
      const store = createStore(reducer)

      it('create store', () => {
        expect(store.getState()).to.have.property('name')
      })
    })

    describe('with multiple reducers', function () {
      const user = sinon.stub().returns({name: 'foo'})
      const did = sinon.stub().returns({what: 'bar'})
      const reducer = (state, action) => ({user: user(), did: did()})
      const store = createStore(reducer)

      it('create store', () => {
        expect(store.getState()).to.have.property('user')
        expect(store.getState().user).to.have.property('name')
        expect(store.getState().user.name).to.eql('foo')
      })
    })

    describe('dispatch', function () {
      const reducer = sinon.stub().returns({name: 'foo'})
      const store = createStore(reducer)

      it('dispatches initial data', () => {
        reducer.returns({name: 'christian'})
        store.dispatch({type: 'EMPTY'})
        expect(store.getState()).to.have.property('name')
        expect(store.getState()).to.not.have.property('type')
        expect(store.getState().name).to.eql('christian')
      })

      it('dispatches new data', () => {
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
        expect(store.getState().name).to.eql('elvis')
        expect(store.getState().last).to.eql('left the building')
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

      it('supports promises', (done) => {
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
    })
  })
})
