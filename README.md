# Pureact - a tiny and pure alternative to React

This is very small implementation of the idea of React+Redux with a very light weight approach. The result is a small lib (~150 lines of code, 6kb incl dependencies gzipped) and superfast (based on snabbdom) with batteries included (a minmal version of Redux+Hooks).

For small projects you don't want to spend time on upgrading a huge dependency tree when you just have a few JSX components. Pureact has a minimal implementation where you can solve the basic needs. Render a couple of components, updating state and fetching data from external API:s. In a few years when you want to update your code you will not need to go through a huge list of dependencies - Pureact only has one dependency.

## Get started

This is a very stratight forward starting point. Just create two files: index.html and index.js:

index.html:
```html
<html><body><script src="index.js"></script></html>
```

index.js:
```javascript
import React, { render } from 'pureact'
const state = { user: 'John' }
const App = (props) => <h1>Hi {props.user}</h1>
render(<App {...state} />, document.body)
```

```bash
$> parcel index.html
```

## Demo

- Mandatkollen, built with pureact: https://mandatkollen.se (code: https://github.com/iteam1337/mandatkollen)
- Todo app, code examples: https://pureact-todo.irony.now.sh (code: https://github.com/irony/pureact-todo )

## Install Pureact

    npm i pureact
    npm i -g parcel

## Add pureact pragma in .babelrc

    "plugins": [
      ["transform-react-jsx", { "pragma": "Pureact.createElement" }]
    ]

## Start coding

Then define your app with pure functions:

```javascript
    const props = {name}
    const App = (props) => <h1>Hi {props.user}</h1>
    Pureact.render(<App {props} />, document.body))
```

## Run and ship it

    // starts dev server and listens to changes
    parcel index.html

    // package
    parcel build index.html // 16kb

## Also pure components

...or using components with a pure render function. Only render method is supported, no other lifetime or state methods are implemented (intentional to keep the pure fashion)

```javascript
import Pureact, { Component } from 'pureact'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React {this.props.name}!</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App
```

## A lightweight redux-compatible store is also included

```javascript
import Pureact, { createStore } from 'pureact'

const reducer = (state, action) => ({
  ...state,
  name: action.name, // naive example
})

const store = createStore(reducer)
```

Plug it in in your render lifecycle:

```javascript
const App = (props) => <h1>{props.name}</h1>
let oldTree

store.subscribe(() => {
  const state = store.getState()
  oldTree = Pureact.render(<App {...state} />, document.body, oldTree)
})
```

To dispatch events, just use the dispatcher

```javascript
store.dispatch({
  type: 'UPDATE_NAME',
  name,
})
```

Note that both reducers and actions can be asyncronous (!)

```javascript
   const reducer = async (state, action) => ({
     user: await user(state.user, action)
   })

   store.dispatch(() => fetch('/user').then(user => ({ type: 'UPDATE_USER', user}))
```

(both promises and thunks are supported)

## Hooks are also included (beta - only works for non-lists right now)

```javascript
import React, { useState } from 'pureact'

const Name = (props) => {
  const [name, setName] = useState('')
  return (
    <div>
      <input
        type="text"
        value={name}
        onchange={(e) => setName(e.target.value)}
      />
    </div>
  )
}
```

## Motivation

- React is a great idea but has become bloated
- Redux is a great idea but should have been included
- Pure functions are a great way of describing components
- For small projects you don't want 1000s of dependencies to update each time

## Current state

The lib has been used in production for four years without any problems. With the latest development in React which moves in the same direction (pure functions and state/hooks included you start to wonder why not just use 66 lines of code instead of thousands?

Let me know if you miss anything important. Either send a pull request or issue. I'm going to try to keep this lib as tiny as possible.

## License

MIT, &copy; Copyright 2023 Christian Landgren
