const {useState} = require('../../src/index')
const {createStore} = require('../../src/index')

describe('hooks', () => {
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
    useState.restart()
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
    useState.restart()
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
    useState.restart()
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
