/** @jsx ljsx */
import ljsx from '../../lib/ljsx'
import User from './user'

export default function (props) {
  return (
    <div className='container'>
      <User {...props.user} />
    </div>
  )
}
