/** @jsx createElement */
import { createElement, render } from '../../'
import store from './store'

import Header from './components/header'
import Main from './components/main'
import Footer from './components/footer'

const main = function (props) {
  return (
    <div>
      <Header {...props}/>
      <Main {...props}/>
      <Footer/>
    </div>
  )
}

store.subscribe(() => {
  const state = store.getState()
  const tree = main(state)
  render(tree, document.getElementById('root'))
})

// start the app
store.dispatch({})
