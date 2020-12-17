import React from 'react'
import Row from 'react-bootstrap/Row'
const style = {
  row: { background: "linear-gradient(to top left,#BBF164,#12B87F)" },
  div: { padding: "35px 35px 150px 35px", textAlign: "center" },
  h1: { fontSize: "3.5rem", color: "#093118" }
}

const Head = () => (
  <Row className="justify-content-md-center" style={style.row}>
    <div style={style.div}>
      <h1 style={style.h1}>
        Desarrollo de Habilidades
      </h1>
    </div>
  </Row>
);
export default Head;

