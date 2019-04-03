const {useState, useReducer} = require('../../src/index')
const {createStore} = require('../../src/index')

describe('hooks', () => {
  describe('useState', () => {
    beforeEach(() => {
      useState.__reset()
    })
    test('initializer', () => {
      expect(useState).not.toBeFalsy()
    })

    test('defaultValue', () => {
      const [value, method] = useState(11)
      expect(value).toEqual(11)
    })

    test('updater works', () => {
      {
        const [size, setSize] = useState(0)
        expect(size).toEqual(0)
        expect(setSize).toHaveProperty('apply')
        setSize(1337)
      }
      useState.flush()
      {
        const [size, setSize] = useState(0)
        expect(setSize).toHaveProperty('apply')
        expect(size).toEqual(1337)
      }
    })

    test('works with thunks as updater', () => {
      {
        const [size, setSize] = useState(0)
        expect(size).toEqual(0)
        expect(setSize).toHaveProperty('apply')
        setSize(() => 1337)
      }
      useState.flush()
      {
        const [size, setSize] = useState(0)
        expect(setSize).toHaveProperty('apply')
        expect(size).toEqual(1337)
      }
    })

    test('two states in parallel works', () => {
      {
        const [count, setCount] = useState(43)
        const [visits, setVisits] = useState(111)
        setCount(1337)
        setVisits(visits + 1)
      }
      useState.flush()
      {
        const [count, setCount] = useState(43)
        const [visits, setVisits] = useState(111)
        expect(count).toEqual(1337)
        expect(visits).toEqual(112)
      }
    })

    test('dispatches a new render to store', (done) => {
      const [count, setCount] = useState(43)
      const store = createStore(() => {})
      setCount(1337)
      store.subscribe(() => {
        const [count, setCount] = useState(43)
        expect(count).toEqual(1337)
        done()
      })
    })


    test('works with promises when working with store', () => {
      const [size, setSize] = useState(12)
      const store = createStore(() => {})
      setSize(Promise.resolve(1337))
      store.subscribe(() => {
        const [size, setSize] = useState(12)
        expect(size).toEqual(1337)
        done()
      })
    })
  })

  describe('useReducer', () => {

    test('useReducer exists', () => {
      expect(useReducer).not.toBeFalsy()
    })

    it('returns an array with inital state as first item', () => {
      const [state, dispatch] = useReducer(() => {}, {foo: 'bar'})
      expect(state).toHaveProperty('foo')
      expect(state.foo).toEqual('bar')
    })


    it('returns an dispatcher', () => {
      const [state, dispatch] = useReducer(() => {}, {foo: 'bar'})
      expect(dispatch).toHaveProperty('apply')
      expect(dispatch.name).toEqual('bound dispatch')
    })

    describe('dispatcher', () => {
      beforeEach(() => {
        useReducer.__reset()
      })

      it('it calls the reducer when being called', (done) => {
        const add = jest.fn((state, action) => ({count: state.count + action.number}))
        const [state, dispatch] = useReducer(add, {count: 0})
        expect(state).toEqual({count: 0})
        dispatch( {number: 1} ).then(state => {
          expect(add).toBeCalledWith({count: 0}, {number: 1})
          expect(state).toEqual({count: 1})
          done()
        })
      })

      it('it works in a more complex example', (done) => {
        const initialState = {count: 0}
        function reducer(state, action) {
          switch (action.type) {
            case 'reset': return {...action.payload}
            case 'increment': return {count: state.count + 1}
            case 'decrement': return {count: state.count - 1}
            default: return state
          }
        }
        const [state, dispatch] = useReducer(
          reducer,
          initialState
        )
        
        dispatch({type: 'reset', payload: initialState})
        dispatch({type: 'increment'})
        dispatch({type: 'increment'})
        dispatch({type: 'decrement'})
          .then(state => {
            expect(state).toEqual({count: 1})
            done()
          })
      })
    })

  })

})
