import Model from './Model'

class MPaddle extends Model {
  constructor({ id = 0, input1 = "" }) {
    super({ id, input1 });
    this.id = id;
    this.input1 = input1;
  }
  validate() {
    let errors = [];
    if (this.input1 == "") {
      errors.push("Ingrese un caso de prueba");
    }
    return errors.length > 0 ? { ok: false, errors: errors } : { ok: true, errors: [] }
  }
  input() {
    return this.input1;
  }
  url() {
    return `${URL_BASE}/api/problem-1`
  }
  getOutput() {
    if (this.respuesta === null) {
      return "";
    }
    else {
      let resp = "";
      for (let re of this.respuesta) {
        console.log(re)
        resp += `${re.win} ${re.missing_games}\n`
      }
      return resp;
    }
  }
}
export default MPaddle;