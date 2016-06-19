/** @jsx ljsx */
import ljsx from '../../lib/ljsx'
import { updateName } from '../actions/user'

export default function (props) {
  return (
    name({...props, 
      onkeyup: (e) => updateName(props.id, e.target.value)
    })
  )
}

function name (props){
  return (
    <label>
      Namn:
      <input type='text' onkeyup={props.onkeyup} value={props.name}/>
    </label>
  )
}