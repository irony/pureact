/** @jsx createElement */
import { createElement } from '../../../'
import { updateName } from '../actions/user'

export default function (props) {
  return (
    name({...props, 
      onkeyup: (e) => updateName(e.target.value)
    })
  )
}

function name (props) {
  return (
    <label>
      Your Name:
      <input type='text' onkeyup={props.onkeyup} value={props.name}/>
    </label>
  )
}