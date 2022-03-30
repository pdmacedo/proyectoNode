class Contenedor {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
  }

  async getAll() {
    const fs = require("fs");

    return await fs.promises

      .readFile(this.nombreArchivo, "utf-8")
      .then((contenido) => {
        return JSON.parse(contenido);
      })

      .catch((error) => {
        console.log(error);
      });
  }

  async getById(num) {
    let result = null;

    const fs = require("fs");

    try {
      let arrayProductos = await this.getAll();
      if (arrayProductos) {
        if (arrayProductos.length > 0) {
          for (let i = 0; i < arrayProductos.length; i++) {
            let x = arrayProductos[i];
            if (parseInt(x.id) === num) {
              result = x;
              console.log(result);
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
    return result;
  }
}

/*  async save(obj) {
    const fs = require("fs");
    try {
      let va = await this.getNextId();
      obj.id = va;
      let objeto = await fs.appendFileSync(
        this.nombreArchivo,
        JSON.stringify(obj) + "\n"
      );
    } catch (error) {
      console.log(error);
    }
  }

  async getNextId() {
    const fs = require("fs");
    let id = 1;

    try {
      let arrayProductos = await this.getAll();
      if (arrayProductos) {
        if (arrayProductos.length > 0) {
          id =
            parseInt(JSON.parse(arrayProductos[arrayProductos.length - 1]).id) +
            1;
        }
        return id;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    const fs = require("fs");
    return await fs.promises
      .readFile(this.nombreArchivo, "utf-8")
      .then((contenido) => {
        // contenido = contenido.split(/\n/);
        // contenido = contenido.filter(function (producto) {
        //   if (producto != "") {
        //     producto = JSON.parse(producto);
        //     return producto;
        //   }
        return JSON.parse(contenido);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getById(num) {
    let result = null;
    const fs = require("fs");
    try {
      let arrayProductos = await this.getAll();
      if (arrayProductos) {
        if (arrayProductos.length > 0) {
          for (let i = 0; i < arrayProductos.length; i++) {
            let x = JSON.parse(arrayProductos[i]);
            if (parseInt(x.id) === num) {
              result = x;
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
    return result;
  }

  async deleteById(num) {
    const fs = require("fs");

    try {
      let arrayProductos = await this.getAll();
      if (arrayProductos) {
        if (arrayProductos.length > 0) {
          arrayProductos = arrayProductos.filter(function (producto) {
            producto = JSON.parse(producto);
            if (parseInt(producto.id) != parseInt(num)) {
              return producto;
            }
          });

          await this.deleteAll();
          await this.writeAll(arrayProductos);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async writeAll(arrayNuevo) {
    const fs = require("fs");
    try {
      for (let i = 0; i < arrayNuevo.length; i++) {
        await fs.appendFileSync(this.nombreArchivo, arrayNuevo[i] + "\n");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    const fs = require("fs");

    await fs.unlinkSync(this.nombreArchivo, (error) => {
      if (error) {
        throw new Error(`Error en eliminar: ${error}`);
      } else {
        console.log("Eliminado.");
      }
    });
  }*/

module.exports = Contenedor;
