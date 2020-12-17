import React from 'react';
const style = {
  outline: "none",
  resize: "none",
  overflow: "auto",
  width: '100%'
}
const TextArea = () => {
  return <textarea
    style={style}
    placeholder="Escriba la entrada"
    name=""
    id=""
    cols="30"
    rows="5"></textarea>
}
export default TextArea;