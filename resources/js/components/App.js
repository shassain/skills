import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  render() {
    return <Container fluid >
      <Row className="justify-content-md-center" style={{ background: "linear-gradient(to top left,#BBF164,#12B87F)" }}>
        <div style={{ padding: "35px 35px 150px 35px" }}>
          <h1 style={{ fontSize: "3.5rem", color: "#093118" }}>
            Desarrollo de Habilidades
          </h1>
        </div>
      </Row>
      <div style={{ position: "relative" }}>
        <Row className="justify-content-md-center" style={{ position: 'absolute', top: "-30px" }}>
          <Col xs="12" sm="4" lg="3" style={{ paddingBottom: "15px" }}>
            <Card style={{ border: "none", borderRadius: "12px 12px 0 0" }}>
              <Card.Body style={{ background: "#1F2937", color: "#fff", borderRadius: "12px 12px 0 0" }}>
                <Card.Title style={{ color: "#A3E635" }}>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This card has even longer content than the first to
                  show that equal height action.
      </Card.Text>
              </Card.Body>
              <Card.Footer style={{ background: "#111827", color: "#A3E635" }}>
                <a href="#" style={{ background: "#111827", color: "#A3E635", fontSize: "1.2em" }}>
                  <i className="fa fa-play-circle-o" /> Iniciar tets
                </a>
              </Card.Footer>
            </Card>
          </Col>

        </Row >
      </div >

    </Container >
  }
}
export default App;
if (document.getElementById('example')) {
  ReactDOM.render(<App />, document.getElementById('example'));
}
