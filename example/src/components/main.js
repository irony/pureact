/** @jsx createElement */
import { createElement } from '../../../'
import User from './user'

export default function (props) {
  return (
    <div className="container">
      <User {...props.user} />
    </div>
  )
}
