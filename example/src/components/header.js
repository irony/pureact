/** @jsx ljsx */
import { ljsx } from 'pureact'

export default function (props) {
  return (
    <nav>
      <div className='logo'>Logo</div>
      <h1>Hello {props.user.name}</h1>
    </nav>
  )
}
