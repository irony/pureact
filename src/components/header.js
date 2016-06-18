/** @jsx ljsx */
import ljsx from '../../lib/ljsx'

export default function (props) {
  console.log('props', props)
  return (
    <nav>
      <div className='logo'>Logo</div>
      <p>User: {props.user.name}</p>
    </nav>
  )
}
