/** @jsx ljsx */
import ljsx from '../lib/ljsx'
import ldom from '../lib/ldom'

import Header from './components/header'
import Main from './components/main'
import Footer from './components/footer'

var user = { name: 'foo' }

var main = function () {
  return (
    <div>
      <Header user={user}/>
      <Main/>
      <Footer/>
    </div>
  )
}

ldom.render(main(), document.getElementById('root'), document)
