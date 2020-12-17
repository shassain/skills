import { transform } from 'lodash'
import React from 'react'
import { Col, Card, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { MdPlayCircleOutline } from "react-icons/md";
import Input from './Input'
import Output from './Output'
const style = {
  col: { paddingBottom: "15px", transform: "rotate(3deg)" },
  card: { border: "none", borderRadius: "12px 12px 0 0" },
  body: { background: "#1F2937", color: "#fff" },
  title: { color: "#A3E635" },
  footer: { background: "#111827", color: "#A3E635" },
  head: { background: "#111827", color: "#A3E635", textTransform: "uppercase" }
}
const CardTest = (props) => {
  let { childen, number, titulo, url } = props;
  return <Col xs="12" sm="12" lg="12" style={style.col}>
    <Card style={style.card}>
      <Card.Header style={style.head}>{titulo} </Card.Header>
      <Card.Body style={style.body}>
        <Row>
          <Col>
            <label>Entrada</label>
            <Input number={number} />
          </Col>
          <Col>
            <label>Salida</label>
            <Output number={number} />
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer style={style.footer}>
        <button type="button">
          <MdPlayCircleOutline style={{ fontSize: "35px" }} /> Iniciar tets
        </button>
        <a href="#">  Descargar el problema</a>
      </Card.Footer>
    </Card>
  </Col >
}
export default CardTest;

