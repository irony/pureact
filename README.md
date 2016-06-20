# Pureact (pronounced "Pure React")

Super lightweight (16kb) and superfast (based on vdom/vtree) subset of react+redux lib

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

## Compatible with the React ecosystem (coming soon...)
When using this lib you can still add components from the React ecosystem, such as React-router etc. 

## Motivation

- React takes forever to install
- React includes too much code
- Flux/Redux is a great idea but should be included
- Control - too much magic going on inside the 560kb of included code in React

## Status: Experimental
Basic stuff works surprisingly well - I haven't found any big hiccups yet but I wouldn't use this lib for anything near production yet.


## License

MIT, &copy; Copyright 2016 Christian Landgren (Iteam)
