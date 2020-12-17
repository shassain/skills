import React from 'react';
const style = {
  outline: "none",
  resize: "none",
  overflow: "auto",
  width: '100%'
}
const Input = ({ number }) => {
  return <textarea
    style={style}
    placeholder="Escriba la entrada"
    id={`input-${number}`}
    cols="30"
    rows="5"></textarea>
}
export default Input;