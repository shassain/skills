import React, { useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CardTest from './complement/CardTest'
import CardCode from './complement/CardCode'
import MStrings from './models/MStrings'
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
class Strings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      strings: new MStrings({ id: 0 })
    }
    this.onChangeStrings = this.onChangeStrings.bind(this);
  }
  onChangeStrings(value, key) {
    let p = this.state.strings
    p.setValue(key, value);
    this.setState({
      strings: p
    })
  }
  render() {
    return <Row className="justify-content-md-center" style={style.row}>
      <Col xs="12" md="10" lg="10" style={style.col}>
        <Row style={style.col_row} >
          <Col xs="12" md="7" lg="7" style={style.col_center}>
            <CardTest
              tipo="strings"
              titulo="Problema: String Value"
              number={3}
              inp="input3"
              model={this.state.strings}
              onChangeModel={this.onChangeStrings} />
          </Col>
          <Col xs="12" md="5" lg="5">
            <CardCode name_problem="String Value" code={codes} type="strings" />
          </Col>
        </Row>
      </Col>
    </Row>
  }
}
export default Strings;