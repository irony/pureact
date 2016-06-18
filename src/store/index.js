import { createStore } from '../../lib/lstore'
import app from '../reducers'

var store = createStore(app)
export default store
