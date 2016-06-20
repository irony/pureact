/** @jsx ljsx */
import { ljsx, render } from '../../'
import store from './store'

import Header from './components/header'
import Main from './components/main'
import Footer from './components/footer'

var main = function (props) {
  return (
    <div>
      <Header {...props}/>
      <Main {...props}/>
      <Footer/>
    </div>
  )
}

store.subscribe(() => {
  var state = store.getState()
  var tree = main(state)
  render(tree, document.getElementById('root'))
})

// start the app
store.dispatch({})
