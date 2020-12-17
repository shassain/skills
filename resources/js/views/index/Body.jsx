import React from 'react'
import Row from 'react-bootstrap/Row'
const style = {
  div: { position: "relative" },
}
const Body = (props) => {
  let { children } = props;

  return <div style={style.div}>

    {children}
  </div>
}
export default Body;

