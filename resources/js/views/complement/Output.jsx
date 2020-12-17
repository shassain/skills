import React from 'react'
const style = {
  background: "#fff",
  whiteSpace: "pre-wrap",
  wordWrap: "break-word",
  height: "125px"
}
const Output = ({ number, value = "" }) => {
  return <pre id={`output-${number}`} style={style}>{value}
  </pre>
}
export default Output;