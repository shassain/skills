import Model from './Model'

class MChess extends Model {
  constructor({ id = 0, input2 = "" }) {
    super({ id, input2 });
    this.id = id;
    this.input2 = input2;
  }
  validate() {
    let errors = [];
    if (this.input2 == "") {
      errors.push("Ingrese un caso de prueba");
    }
    return errors.length > 0 ? { ok: false, errors: errors } : { ok: true, errors: [] }
  }
  input() {
    return this.input2;
  }
  url() {
    return `${URL_BASE}/api/problem-2`
  }
  getOutput() {
    if (this.respuesta === null) {
      return "";
    }
    else {
      let resp = this.respuesta.attack
      return resp;
    }
  }
}
export default MChess;