/** @jsx ljsx */
import { ljsx } from '../../../'

export default function (props) {
  return (
    <nav>
      <div className='logo'>Logo</div>
      <h1>Hello {props.user.name}</h1>
    </nav>
  )
}
