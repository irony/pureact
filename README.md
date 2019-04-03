# Pureact - what React should have been if we knew what it was when it was discovered

This is very small implementation of the idea of React+Redux with a very light weight approach. The result is a lightweight lib (65 lines of code, 10kb incl dependencies gzipped) and superfast (based on snabbdom) with batteries included (a lightweight version of redux). 

## Basic Idea

Pure functions are a fantastic way to represent a component and an entire app.

    import React, {render, createStore} from 'pureact'
    const state = {user: 'John'}
    const App = (props) => <h1>Hi {props.user}</h1>
    render(<App {...state} />, document.getElementById('root'))
    
## Demo

Mandatkollen, built with pureact: https://mandatkollen.se
Todo app, code examples: https://github.com/irony/pureact-todo
    
## Get Started

Start with a blank React project

    create-react-app my-app
    cd my-app
    npm start

## Replace React with Pureact

    npm remove react react-dom
    npm install pureact

Include Pureact instead of React in each file:

    import React from 'pureact' // Important! Keep the React name
    import ReactDOM from 'pureact'

Then define your app with pure functions:

    const App = (props) => <h1>Hi {props.user}</h1>

...or using components with a pure render function. Only render method is supported, no other lifetime or state methods are implemented (intentional to keep the pure fashion)

    import React, { Component } from 'pureact';
    import logo from './logo.svg';
    import './App.css';

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
        );
      }
    }

    export default App;

## A lightweight redux-compatible store is also included:

    import { createStore } from 'pureact';
    
    const reducer = (state, action) => ({
      ...state,
      name: action.name // naive example
    })

    const store = createStore(reducer)

Plug it in in your render lifecycle:

    const App = (props) => <h1>{props.name}</h1>
    let oldTree
    
    store.subscribe(() => {
      const state = store.getState()
      oldTree = ReactDOM.render(<App {...state} />, document.getElementById('root'), oldTree)
    })

To dispatch events, just use the dispatcher

    store.dispatch({
      type: 'UPDATE_NAME',
      name
    })

Note that both reducers and actions can be asyncronous (please dont shoot me, it's actually really useful)

    const reducer = async (state, action) => ({
      user: await user(state.user, action)
    })
    
    store.dispatch(() => fetch('/user').then(user => ({ type: 'UPDATE_USER', user}))

(both promises and thunks are supported)

## Hooks are also included (beta)
    
    import React, { useState } from 'pureact'
    
    const Name = (props) => {
      const [name, setName] = useState('')
      return <div><input type="text" value={name} onchange={e => setName(e.target.value)}/></div>
    }
    
More hooks are coming soon...

## Motivation

- React is a great idea but has become bloated
- Redux is a great idea but should have been included
- Pure functions are a great way of describing components

## Current state
The lib has been used in production for a year without any problems. With the latest development in React which moves in the same direction (pure functions and state/hooks included you start to wonder why not just use 66 lines of clde instead of thousands? 

Let me know if you miss anything important. Either send a pull request or issue. I'm going to try to keep this lib as tiny as possible.

## License

MIT, &copy; Copyright 2019 Christian Landgren @ Iteam
