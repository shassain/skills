import React, { useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CardTest from './complement/CardTest'
import CardCode from './complement/CardCode'
import MPaddle from './models/MPaddle'
import { codes } from './Codes/code'
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
class Paddle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paddle: new MPaddle({ id: 0 })
    }
    this.onChangePaddle = this.onChangePaddle.bind(this);
  }
  onChangePaddle(value, key) {
    let p = this.state.paddle
    p.setValue(key, value);
    this.setState({
      paddle: p
    })
  }
  render() {
    return <Row className="justify-content-md-center" style={style.row}>
      <Col xs="12" md="10" lg="10" style={style.col}>
        <Row style={style.col_row} >
          <Col xs="12" md="7" lg="7" style={style.col_center}>
            <CardTest
              tipo="paddle"
              titulo="Problema: Liga de Padel"
              number={1}
              inp="input1"
              model={this.state.paddle}
              onChangeModel={this.onChangePaddle} />
          </Col>
          <Col xs="12" md="5" lg="5">
            <CardCode name_problem="Liga de Padel" code={codes} type="paddle" />
          </Col>
        </Row>
      </Col>
    </Row>
  }
}
export default Paddle;