# Pureact (pronounced "Pure React") - An experiment in react+redux

This is a try to simulate the main functionality in React with as few lines of code as possible and as few dependencies as possible. The result is a Super lightweight (16kb incl dependencies) and superfast (based on vdom/vtree) including the most essential parts of react+redux 

## Demo

    git clone https://github.com/irony/pureact
    cd pureact/example
    npm start

## Usage

    npm install --save pureact

Add a comment on each file to use ljsx instead of JSX and import ljsx from Pureact:

    /** @jsx ljsx */
    import {ljsx, ldom} from 'pureact'

Then define your app with pure functions:

    var main = function (props) {
      return (
        <div>
          <Header {...props}/>
          <UserContainer {...props}/>
          <Footer/>
        </div>
      )
    }

...

    function UserContainer (props) {
      return User({
        ...props, 
        onkeyup: (e) => updateName(e.target.value)
      })
    }

    function User (props){
      return (
        <label>
          Your Name:
          <input type='text' onkeyup={props.onkeyup} value={props.name}/>
        </label>
      )
    }

A lightweight redux-compatible store is included:

    function updateName(name){
      store.dispatch({
        type: 'UPDATE_NAME',
        name
      })
    }

Start it by listening to the store for changes:

    store.subscribe(() => {
      var state = store.getState()
      var tree = main(state)
      render(tree, document.getElementById('root'))
    })

    // start the app
    store.dispatch({})


## Compatible with the React ecosystem (not verified yet...)
When using this lib you should still be able to add components from the React ecosystem, such as React-router etc. 

## Motivation

- React takes forever to install
- React includes too much code
- Flux/Redux is a great idea but should be included
- Control - too much magic going on inside the 560kb of included code in React

## Status: Experimental
Basic stuff works surprisingly well - I haven't found any big hiccups yet but I wouldn't use this lib for anything near production yet. Please report issues. 


## License

MIT, &copy; Copyright 2016 Christian Landgren (Iteam)
