/** @jsx ljsx */
import { ljsx } from 'pureact'
import User from './user'

export default function (props) {
  return (
    <div className='container'>
      <User {...props.user } />
    </div>
  )
}
