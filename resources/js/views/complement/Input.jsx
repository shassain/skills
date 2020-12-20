import React, { useEffect, useState } from 'react';
const style = {
  outline: "none",
  resize: "none",
  overflow: "auto",
  width: '100%'
}
const Input = ({ number, val, getValue }) => {
  let [value, setValue] = useState(val);
  useEffect(() => {
    getValue(value);
  }, [value])
  return <textarea
    onChange={(e) => setValue(e.target.value)}
    value={value}
    style={style}
    placeholder="Escriba la entrada"
    id={`input-${number}`}
    cols="30"
    rows="5" />
}
export default Input;