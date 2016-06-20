# Pureact (pronounced "Pure React")

Super lightweight (<100 lines) subset of react+redux lib with only two small dependencies (vdom+vtree)

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
          <Main {...props}/>
          <Footer/>
        </div>
      )
    }

...

    function name (props){
      return (
        <label>
          Your Name:
          <input type='text' onkeyup={props.onkeyup} value={props.name}/>
        </label>
      )
    }

A lightweight redux-compatible store is included:

    import store from '../store'

    export function updateName (name) {
      return store.dispatch({
        type: 'UPDATE_NAME',
        name
      })
    }

## License

MIT, &copy; Copyright 2016 Christian Landgren (Iteam)
