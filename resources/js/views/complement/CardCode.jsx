import React from 'react'
import Problem from '../complement/Problem'
const style = {
  red: { width: "15px", height: "15px", borderRadius: "50%", border: "3px solid red" },
  gold: { width: "15px", height: "15px", borderRadius: "50%", border: "3px solid gold" },
  green: { width: "15px", height: "15px", borderRadius: "50%", border: "3px solid green" }
}
const CardCode = ({ name_problem, code }) => {
  return <div style={{ transform: "rotate(3deg)", background: "#001A0A", color: "#fff", borderRadius: "20px 20px 0 0" }}>
    <div style={{ display: "flex" }}>
      <div style={{ padding: "15px", display: "flex", justifyContent: "space-around", flex: "1" }}>
        <div style={style.red}></div>
        <div style={style.gold}></div>
        <div style={style.green}></div>
      </div>
      <div style={{ padding: "15px", display: "flex", justifyContent: "space-around", flex: "5" }}>
        Codigo de{name_problem}
      </div>
    </div>
    <Problem code={code} />
  </div>
}
export default CardCode;