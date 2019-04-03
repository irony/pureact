const createContext = require('../../src')

xdescribe('context', () => {
  it('createContext exists', () => {
    expect(createContext).not.toBeFalsy()
  })

  it('sends dispatch to all child nodes', () => {
    const store = createContext({
      todo: [{id: 1337}]
    })
    //const Child = jest.fn(({dispatch}) => <div></div>)
    //const tree = <store.Provider><Child/></store.Provider>
    expect(Child).toBeCalled()
  })
})
