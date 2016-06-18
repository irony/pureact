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
      <Header/>
      <Main {...props}/>
      <Footer/>
    </div>
  )
}

store.subscribe((action, state) => {
  console.log('action', action)
  ldom.render(main, document.getElementById('root'), state)
})

// start the app
store.dispatch({
  type: 'START',
  user: {
    name: 'Christian Landgren'
  }
})
