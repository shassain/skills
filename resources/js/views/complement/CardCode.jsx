import React, { useState } from 'react'
import Problem from '../complement/Problem'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
const style = {
  red: { width: "15px", height: "15px", borderRadius: "50%", border: "3px solid red" },
  gold: { width: "15px", height: "15px", borderRadius: "50%", border: "3px solid gold" },
  green: { width: "15px", height: "15px", borderRadius: "50%", border: "3px solid green" }
}
const CardCode = ({ name_problem, code, type }) => {
  let [name, setName] = useState('Controller')
  return <div style={{ transform: "rotate(3deg)", background: "#001A0A", color: "#fff", borderRadius: "20px 20px 0 0" }}>
    <div style={{ display: "flex" }}>
      <div style={{ padding: "15px", display: "flex", justifyContent: "space-around", flex: "1" }}>
        <div style={style.red}></div>
        <div style={style.gold}></div>
        <div style={style.green}></div>
      </div>
      <div style={{ padding: "15px", display: "flex", justifyContent: "space-around", flex: "5" }}>
        <DropdownButton
          id={`dropdown-button-drop-1`}
          size="sm"
          variant="secondary"
          title={`${name_problem} : ${name}`}
          style={{ background: "transparent" }}
        >
          <Dropdown.Item onClick={() => {
            setName("Controller")
          }}>Controller </Dropdown.Item>
          <Dropdown.Item onClick={() => {
            setName("Model")
          }}>Models</Dropdown.Item>
          <Dropdown.Item onClick={() => {
            setName("Problem")
          }}>Problem solved</Dropdown.Item>
        </DropdownButton>

      </div>
    </div>
    <Problem code={code[type][name]} />
  </div>
}
export default CardCode;