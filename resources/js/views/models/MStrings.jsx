import Model from './Model'

class MStrings extends Model {
  constructor({ id = 0, input3 = "" }) {
    super({ id, input3 });
    this.id = id;
    this.input3 = input3;
  }
  validate() {
    let errors = [];
    if (this.input3 == "") {
      errors.push("Ingrese un caso de prueba");
    }
    return errors.length > 0 ? { ok: false, errors: errors } : { ok: true, errors: [] }
  }
  input() {
    return this.input3;
  }
  url() {
    return `${URL_BASE}/api/problem-3`
  }
  getOutput() {
    if (this.respuesta === null) {
      return "";
    }
    else {
      let resp = this.respuesta.best
      return resp;
    }
  }
}
export default MStrings;