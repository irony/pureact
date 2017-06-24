# Pureact - what React should have been if we knew what it was when we discovered it

This is very small implementation of the idea of React+Redux with a very light weight approach. The result is a lightweight lib (65 lines of code, 10kb incl dependencies gzipped) and superfast (based on snabbdom) with batteries included (a lightweight version of redux). 

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

    const App = (props) => <h1>Hi {props.name}</h1>

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


## Built on top of Snabbdom
The rendering is done with a lib called Snabbdom which has a lot of neat functions. For example, 

Events: https://github.com/snabbdom/snabbdom#eventlisteners-module

    function clickHandler(nr) { console.log(nr, 'got clicked') }
    return <button on={{click: [clickHandler, 1] }}

And animations: https://github.com/snabbdom/snabbdom#the-style-module

    <li style={{opacity: '1', transition: 'opacity 1s',
          remove: {opacity: '0'}}}>...</li>


## Motivation

- React is a great idea but has become bloated
- Redux is a great idea but should have been included
- Pure functions are a great way of solving components

## What is this for?
I don't expect anyone to start replacing React to this anytime soon. However this lib can be seen as a way to teach others how I usually write React apps and when keeping the components stateless and forcing the state to be handled as logic rather than UI everything gets a lot easier to handle. If you start using this lib and then switch to React, they should be 100% compatible (not the other way around of course). 

Let me know if you have any features related to the idea of a purely functional version of react and file a pull request or issue and we'll discuss it. I'm going to try to keep this lib as tiny as possible. The only thing I'm thinking of adding right now is a lightweight router.


## License

MIT, &copy; Copyright 2016 Christian Landgren (Iteam)
