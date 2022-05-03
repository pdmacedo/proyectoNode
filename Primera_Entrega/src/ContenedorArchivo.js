const { promises: fs } = require("fs");

class ContenedorArchivo {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async listar(id) {
    let rawdata = await fs.readFile(this.ruta);
    let data = JSON.parse(rawdata);

    let aux = data.filter((dat) => dat.id == id);

    if (this.ruta.includes("Carritos")) {
      aux = aux.map(function (e) {
        return e.productos;
      });
    }

    return aux;
  }

  async listarAll() {
    let rawdata = await fs.readFile(this.ruta);
    let data = JSON.parse(rawdata);

    return data;
  }

  async guardarPorId(id) {
    let rawdata = await fs.readFile("../Primera_Entrega/dbProductos.json");
    let data = JSON.parse(rawdata);
    let dataAux = [...data];

    let datosCarro = await fs.readFile(this.ruta);
    let dataNueva = JSON.parse(datosCarro);

    dataAux = dataAux.map(function (obj) {
      if (obj.id == id) {
        dataNueva = dataNueva.map(function (e) {
          e.productos.push(obj);
          return e;
        });
      }
    });

    dataNueva = JSON.stringify(dataNueva);
    await fs.writeFile(this.ruta, dataNueva);
  }

  async guardar(obj) {
    let idNuevo = await this.getNextId();
    obj.id = idNuevo;
    obj.timestamp = Date.now();

    if (this.ruta.includes("Carritos")) {
      obj.productos = [];
    }

    let rawdata = await fs.readFile(this.ruta);
    let data = JSON.parse(rawdata);
    data.push(obj);
    data = JSON.stringify(data);
    await fs.writeFile(this.ruta, data);

    return "Guardado con éxito";
  }

  async getNextId() {
    let x = await this.listarAll();
    let aux = [...x];
    let id = 1;
    if (aux) {
      if (aux.length > 0) {
        id = parseInt(aux[aux.length - 1].id) + 1;
      }
    }
    return id;
  }

  async actualizar(elem, id) {
    let rawdata = await fs.readFile(this.ruta);
    let data = JSON.parse(rawdata);
    let dataAux = [...data];

    dataAux = dataAux.map(function (obj) {
      if (obj.id == id) {
        obj.nombre = elem.nombre;
        obj.descripcion = elem.descripcion;
        obj.codigo = elem.codigo;
        obj.foto = elem.foto;
        obj.precio = elem.precio;
        obj.stock = elem.stock;
        obj.timestamp = Date.now();
      }
      return obj;
    });

    dataAux = JSON.stringify(dataAux);
    await fs.writeFile(this.ruta, dataAux);

    return "Actualizado con éxito";
  }

  async borrar(id) {
    let rawdata = await fs.readFile(this.ruta);
    let data = JSON.parse(rawdata);
    let dataAux = [...data];

    dataAux = dataAux.filter(function (obj) {
      if (obj.id != id) {
        return obj;
      }
    });

    dataAux = JSON.stringify(dataAux);
    await fs.writeFile(this.ruta, dataAux);

    return "Eliminado con éxito";
  }

  async eliminarDelCarrito(id, idProd) {
    let rawdata = await fs.readFile(this.ruta);
    let data = JSON.parse(rawdata);
    let dataAux = [...data];

    dataAux = dataAux.map(function (obj) {
      if (obj.id == id) {
        obj.productos = obj.productos.filter(function (e) {
           if (e.id != idProd) {
            obj.productos = e;
            return obj.productos;
          }
        });
      }
      return obj;
    });

    dataAux = JSON.stringify(dataAux);
    await fs.writeFile(this.ruta, dataAux);
  }
}

module.exports = ContenedorArchivo;
