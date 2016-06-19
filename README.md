# l.js
Super lightweight react+redux lib with only one dependency (virtual-dom)


## Usage

    npm install --save pureact

Add a comment on each file to use ljsx instead of JSX and import ljsx from l.js:

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
