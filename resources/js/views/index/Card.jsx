import React from 'react'
import { Col, Card, } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const style = {
  col: { paddingBottom: "15px" },
  card: { border: "none", borderRadius: "12px 12px 0 0" },
  body: { background: "#1F2937", color: "#fff", borderRadius: "12px 12px 0 0" },
  title: { color: "#A3E635" },
  footer: { background: "#111827", color: "#A3E635" }
}
const CardLink = (props) => {
  let { childen, text, titulo, url } = props;
  return <Col xs="12" sm="4" lg="3" style={style.col}>
    <Card style={style.card}>
      <Card.Body style={style.body}>
        <Card.Title style={style.title}>{titulo} </Card.Title>
        <Card.Text>
          {text}
        </Card.Text>
      </Card.Body>
      <Card.Footer style={style.footer}>
        <Link to={url} style={{ background: "#111827", color: "#A3E635", fontSize: "1.2em" }} >
          <i className="fa fa-play-circle-o" /> Iniciar tets
        </Link>
      </Card.Footer>
    </Card>
  </Col >
}
export default CardLink;

