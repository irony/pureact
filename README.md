# Pureact (pronounced "Pure React") - An experiment in react+redux

This is very small implementation of the idea of React+Redux with a vanilla js approach. The result is a Super lightweight (14kb incl dependencies) and superfast (based on virtual-dom) including the most essential parts of react+redux 

## Start with a blank React project

    create-react-app my-app
    cd my-app
    yarn start

## Replace React with Pureact

    yarn remove react react-dom
    yarn add pureact

Include Pureact instead of React in each file:

    import React from 'pureact'
    import ReactDOM from 'pureact';

Then define your app with pure functions:

    import React, { Component } from 'pureact';
    import logo from './logo.svg';
    import './App.css';

    class App extends Component {
      render() {
        return (
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Welcome to React</h2>
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

    store.subscribe(() => {
      var state = store.getState()
      ReactDOM.render(<App {...state} />, document.getElementById('root'))
    })

    // start the app by dispatching an empty event
    store.dispatch()

To dispatch events, just use the dispatcher

    store.dispatch({
      type: 'UPDATE_NAME',
      name
    })

## Motivation

- React is a great idea but has become bloated
- Flux/Redux is a great idea but should be included
- Pure functions are a great way of solving components

## License

MIT, &copy; Copyright 2016 Christian Landgren (Iteam)
