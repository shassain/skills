import { transform } from 'lodash'
import React from 'react'
import { Col, Card, } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { MdPlayCircleOutline } from "react-icons/md";
import TextArea from './TextArea'
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
  let { childen, text, titulo, url } = props;
  return <Col xs="12" sm="12" lg="12" style={style.col}>
    <Card style={style.card}>
      <Card.Header style={style.head}>Nombre del problema</Card.Header>
      <Card.Body style={style.body}>
        <label>Entrada</label>
        <TextArea />
        <label>Salida</label>
        <Output />
      </Card.Body>
      <Card.Footer style={style.footer}>
        <Link to={url} style={{ background: "#111827", color: "#A3E635", fontSize: "1.2em" }} >
          <MdPlayCircleOutline style={{ fontSize: "35px" }} /> Iniciar tets
        </Link>
      </Card.Footer>
    </Card>
  </Col >
}
export default CardTest;

