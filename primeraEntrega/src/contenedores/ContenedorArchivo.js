const fs = require("fs");

class ProductosApi {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
  }

  async save(obj) {
    try {
      let proxId = await this.getNextId();
      obj.id = proxId;
      await fs.appendFileSync(
        this.nombreArchivo,
        JSON.stringify(obj) + "\n"
      );
      return JSON.stringify("Agregado correctamente");
    } 
    catch (error) {
      console.log(error);
    }

    return JSON.stringify("Lo sentimos, no se pudo guardar");
  }

  async getNextId() {
    let id = 1;

    try {
      let arrayProductos = await this.getAll();

      if (arrayProductos.length > 0) {
        id = parseInt(arrayProductos[arrayProductos.length - 1].id) + 1;
      }
      return id;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {

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

    try {
      let arrayProductos = await this.getAll();
      if (arrayProductos) {
        if (arrayProductos.length > 0) {
          for (let i = 0; i < arrayProductos.length; i++) {
            let x = arrayProductos[i];
            if (parseInt(x.id) === parseInt(num)) {
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

//   async actualizaId(num, product) {
//     const newProd = { id: Number(num), product };
//     const index = this.productos.findIndex((p) => p.id == num);

//     if (index !== -1) {
//       this.productos[index] = newProd;

//       return newProd;
//     } else {
//       return { error: "Producto no encontrado" };
//     }
//   }

  async deleteById(num) {
    try {
      let arrayProductos = await this.getAll();
      if (arrayProductos) {
        if (arrayProductos.length > 0) {
          let nuevoArreglo = arrayProductos.filter(function (producto) {
            if (parseInt(producto.id) != parseInt(num)) {
              return producto;
            }
          });

          await this.deleteAll();
          await this.writeAll(nuevoArreglo);

        } else {
          return JSON.stringify("El arreglo esta vacío");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async writeAll(arrayNuevo) {
    try {
      for (let i = 0; i < arrayNuevo.length; i++) {
        await fs.appendFileSync(this.nombreArchivo, arrayNuevo[i] + "\n");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {

    await fs.unlinkSync(this.nombreArchivo, (error) => {
      if (error) {
        throw new Error(`Error en eliminar: ${error}`);
      } else {
        console.log("Eliminado.");
      }
    });
  }
}

class CarritosApi {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
  }

  async creaCarrito(obj) {
    try {
      let proxId = await this.getNextId();
      obj.id = proxId;
      await fs.appendFileSync(
        this.nombreArchivo,
        JSON.stringify(obj) + "\n"
      );
      return JSON.stringify(`Carrito creado con Id: ${proxId}`);
    } 
    catch (error) {
      console.log(error);
    }

    return JSON.stringify("Lo sentimos, no se pudo crear");
  }

  async getNextId() {
    let id = 1;

    try {
      let arrayProductos = await this.getAll();

      if (arrayProductos.length > 0) {
        id = parseInt(arrayProductos[arrayProductos.length - 1].id) + 1;
      }
      return id;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {

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

    try {
      let arrayProductos = await this.getAll();
      if (arrayProductos) {
        if (arrayProductos.length > 0) {
          for (let i = 0; i < arrayProductos.length; i++) {
            let x = arrayProductos[i];
            if (parseInt(x.id) === parseInt(num)) {
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
  
  async deleteById(num) {
    try {
      let arrayProductos = await this.getAll();
      if (arrayProductos) {
        if (arrayProductos.length > 0) {
          let nuevoArreglo = arrayProductos.filter(function (producto) {
            if (parseInt(producto.id) != parseInt(num)) {
              return producto;
            }
          });

          await this.deleteAll();
          await this.writeAll(nuevoArreglo);

        } else {
          return JSON.stringify("El arreglo esta vacío");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async writeAll(arrayNuevo) {
    try {
      for (let i = 0; i < arrayNuevo.length; i++) {
        await fs.appendFileSync(this.nombreArchivo, arrayNuevo[i] + "\n");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {

    await fs.unlinkSync(this.nombreArchivo, (error) => {
      if (error) {
        throw new Error(`Error en eliminar: ${error}`);
      } else {
        console.log("Eliminado.");
      }
    });
  }
}

module.exports = ProductosApi;
module.exports = CarritosApi;
