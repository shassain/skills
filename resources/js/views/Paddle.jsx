import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Problem from './complement/Problem'
import CardTest from './complement/CardTest'
const style = {
  col: {
    background: "#F3F4F6",
    height: "380px",
    borderRadius: "35px"
  },
  col_center: {
    display: "flex",
    alignItems: "center"
  },
  col_row: {
    background: "linear-gradient(to top left,#BBF164,#12B87F)",
    height: "380px",
    transform: "rotate(-3deg)",
    borderRadius: "35px"
  },
  row: { position: 'relative', top: "-30px" }
}
const Paddle = () => {
  return <Row className="justify-content-md-center" style={style.row}>
    <Col xs="12" md="10" lg="10" style={style.col}>
      <Row style={style.col_row} >
        <Col xs="12" md="7" lg="7" style={style.col_center}>
          <CardTest />
        </Col>
        <Col xs="12" md="5" lg="5">
          <Problem />
        </Col>
      </Row>
    </Col>
  </Row>
}
export default Paddle;