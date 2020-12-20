class Model {
  constructor(props) {
    this.id = props.id != undefined ? props.id : 0;
    { props };
    this.respuesta = null;
  }

  async save(url, formData = null) {
    try {
      let config = {
        method: 'POST',
        header: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: formData == null ? this.getFormData() : formData
      }
      let res = await fetch(url, config)
      if (res.ok) {
        let r = await res.json()
        return { data: r, msn: "Proceso terminado correctamente", ok: true };
      } else {
        return { data: null, msn: "Error al momento de procesar los datos", ok: false };
      }
    }
    catch (e) {
      return { data: null, msn: e.getMessage(), ok: false };
    }
  }
  async destroy(url) {
    let formData = new FormData();
    formData.append("_method", "DELETE");
    try {
      let config = {
        method: 'POST',
        header: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: formData
      }
      let res = await fetch(url, config)
      if (res.ok) {
        let r = await res.json()
        return { data: r, msn: "proceso terminado correctamente", ok: true };
      } else {
        return { data: null, msn: "Error al tratar de eliminar", ok: false };
      }
    }
    catch (e) {
      return { data: null, msn: e.getMessage(), ok: false };
    }
  }
  setValue(key, value) {
    this[key] = value;
  }
  getValue(key) {
    return this[key];
  }
  getPropietaries() {
    let array = [];
    for (let p in this.props) {
      array.push(p);
    }
    return array;
  }
  getJson() {
    let json = { id: this.id };
    for (let p in this) {
      json[p] = this[p];
    }
    return json;
  }
  getFormData(formdata = null) {

    if (formdata == null || (formdata != null && !(formdata instanceof FormData))) {
      formdata = new FormData();
    }
    if (this.id != 0) {
      formdata.append("id", this.id)
      formdata.append("_method", "put")
    }
    for (let p in this) {
      formdata.append(p, this[p])
    }
    return formdata;
  }
}
export default Model;