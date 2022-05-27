const { promises: fs } = require("fs");

class ContenedorArchivo {
    constructor(ruta) {
      this.ruta = ruta;
    }

    async listar(id) {
      let rawdata = await fs.readFile(this.ruta);
      let data = JSON.parse(rawdata);
  
      let aux = data.filter((dat) => dat.id == id);
      return aux;
    }

    async listarAll() {
      let rawdata = await fs.readFile(this.ruta);
      let data = JSON.parse(rawdata);
  
      return data;
    }
  }
  
  module.exports = ContenedorArchivo;
  