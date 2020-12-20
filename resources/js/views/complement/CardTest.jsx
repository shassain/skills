import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Col, Card, Row } from 'react-bootstrap'
import ReactLoading from "react-loading";
import { MdPlayCircleOutline, MdFileDownload } from "react-icons/md";
import Input from './Input'
import Output from './Output'
const style = {
  col: { paddingBottom: "15px", transform: "rotate(3deg)" },
  card: { border: "none", borderRadius: "12px 12px 0 0" },
  body: { background: "#1F2937", color: "#fff" },
  title: { color: "#A3E635" },
  footer: { background: "#111827", color: "#A3E635", display: "flex", justifyContent: "space-around" },
  head: { background: "#111827", color: "#A3E635", textTransform: "uppercase" }
}
const onSubmit = async (model, onChangeModel) => {
  let validate = model.validate();

  if (!validate.ok) {
    let eror = "";
    for (let er of validate.errors) {
      eror = eror + er + " \n"
    }
    return { r: "error", msn: eror }
  }
  let resp = await model.save(model.url());
  if (resp.ok) {
    onChangeModel(resp.data, "respuesta");
    return { r: "success", msn: resp.msn }
  }
  return { r: "error", msn: resp.msn }
}
const CardTest = (props) => {
  let { childen, inp, number, titulo, tipo, model, onChangeModel } = props;
  let [send, setSend] = useState(false);

  return <Col xs="12" sm="12" lg="12" style={style.col}>
    <Card style={style.card}>
      <Card.Header style={style.head}>{titulo} </Card.Header>
      <Card.Body style={style.body}>
        <Row>
          <Col xs="12" md="6">
            <label>Entrada</label>
            <Input number={number} val={model.input()} getValue={(value) => onChangeModel(value, inp)} />
          </Col>
          <Col xs="12" md="6">
            <label>Salida</label>
            <Output number={number} value={model.getOutput()} />
          </Col>
        </Row>
        <ToastContainer />
      </Card.Body>
      <Card.Footer style={style.footer}>
        {
          !send
            ?
            <button
              onClick={async () => {
                setSend(true);
                let r = await onSubmit(model, onChangeModel);
                if (r.r === "error") {
                  toast.error(r.msn, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                } else {
                  toast.success(r.msn, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                }
                setSend(false);
              }}
              type="button"
              style={{ border: "none", background: "transparent", color: "rgb(163, 230, 53)", flex: "1" }}>
              <MdPlayCircleOutline style={{ fontSize: "35px" }} /> Iniciar Prueba
            </button>
            :
            <div style={{ flex: "1", display: "flex", justifyContent: "center" }}>
              <ReactLoading type="bars" color="rgb(163, 230, 53)" />
            </div>

        }
        <a href={`/get-file/${tipo}.docx`} target="_blank" style={{ border: "none", background: "transparent", color: "rgb(163, 230, 53)", flex: "1" }}><MdFileDownload style={{ fontSize: "35px" }} />  Descargar el problema</a>
      </Card.Footer>
    </Card>
  </Col >
}
export default CardTest;

