import React from 'react'
import { Col, Card, } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { MdCode, MdFileDownload } from "react-icons/md";
const style = {
  col: { paddingBottom: "15px" },
  card: { border: "none", borderRadius: "12px 12px 0 0" },
  body: { background: "#1F2937", color: "#fff", borderRadius: "12px 12px 0 0" },
  title: { color: "#A3E635" },
  footer: { background: "#111827", color: "#A3E635" }
}
const CardLink = (props) => {
  let { childen, text, titulo, url, tipo } = props;
  return <Col xs="12" sm="4" lg="3" style={style.col}>
    <Card style={style.card}>
      <Card.Body style={style.body}>
        <Card.Title style={style.title}>{titulo} </Card.Title>
        <Card.Text>
          {text}
          <a href={`/get-file/${tipo}.docx`} target="_blank" style={{ border: "none", background: "transparent", color: "rgb(163, 230, 53)", flex: "1" }}><MdFileDownload />  Descargar</a>
        </Card.Text>
      </Card.Body>
      <Card.Footer style={style.footer}>
        <Link to={url} style={{ background: "#111827", color: "#A3E635", fontSize: "1.2em" }} >
          <MdCode /> Iniciar pruebas
        </Link>
      </Card.Footer>
    </Card>
  </Col >
}
export default CardLink;

