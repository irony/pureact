/** @jsx ljsx */
import ljsx from '../lib/ljsx'
import ldom from '../lib/ldom'
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
  ldom.render(tree, document.getElementById('root'))
})

// start the app
store.dispatch({
  type: 'START'
})
