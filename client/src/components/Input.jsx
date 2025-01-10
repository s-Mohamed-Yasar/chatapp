import React from 'react'

function Input(props) {
  return (
    <div>
      <input onChange={props.changing} value={props.value} type="text" name={props.name} placeholder={props.placeholder} />
    </div>
  );
}


export default Input