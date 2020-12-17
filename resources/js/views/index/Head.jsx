import React from 'react'
import Row from 'react-bootstrap/Row'
import { FiHome, FiChevronRight } from "react-icons/fi"
import { Link } from "react-router-dom"
import { cardList } from '../../routes/routes'
const style = {
  row: { background: "#12B87F" },
  div: { padding: "35px 35px 150px 35px", textAlign: "center" },
  h1: { fontSize: "3.5rem", color: "#093118" }
}

const Head = () => (
  <Row className="justify-content-md-center" style={style.row}>
    <div style={style.div}>
      <h1 style={style.h1}>
        Desarrollo de Habilidades
      </h1>
      <div style={{ display: "flex", justifyContent: "space-around", color: "red" }}>
        <Link to="./" style={{ color: "#F6BC24" }}>
          <FiHome /> Inicio
        </Link>
        {
          cardList.map(el => <Link to={el.url} style={{ color: "#F6BC24" }}>
            <FiChevronRight /> {el.label}
          </Link>)
        }
      </div>
    </div>
  </Row>
);
export default Head;

