/** @jsx ljsx */
import ljsx from '../../lib/ljsx'
import { updateName } from '../actions/user'

export default function (props) {
  return (<input type='text' value={props.name}/>)
}

