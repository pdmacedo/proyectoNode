const listaProductos = require("../dbProductos.json");

class ProductosApi {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
  }

  async save(obj) {
    try {
      let proxId = await this.getNextId();
      obj.id = proxId;
      listaProductos.push(obj);

      return JSON.stringify("Agregado correctamente");
    } catch (error) {
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
    return listaProductos;
  }

  async makeHtmlTable(listaProductos) {
    let html = `
        <style>
            .table td,
            .table th {
                vertical-align: middle;
            }
        </style>`;

    if (listaProductos.length > 0) {
      html += `
        <h2>Lista de Productos</h2>
        <div class="table-responsive">
            <table class="table table-dark">
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Foto</th>
                </tr>`;
      for (const prod of listaProductos) {
        html += `
                    <tr>
                    <td><a type="button" onclick="llenarFormulario('${prod.title}', '${prod.precio}','${prod.url}')" title="copiar a formulario...">${prod.title}</a></td>
                    <td>$${prod.precio}</td>
                    <td><img width="50" src=${prod.url} alt="not found"></td>
                    <td><a type="button" onclick="borrarProducto('${prod.id}')">borrar</a></td>
                    <td><a type="button" onclick="actualizarProducto('${prod.id}')">actualizar</a></td>
                    </tr>`;
      }
      html += `
            </table>
        </div >`;
    }
    return Promise.resolve(html);
  }

  async getById(num) {
    let result = null;
    let nuevoArreglo = [];

    try {
      let arrayProductos = await this.getAll();
      if (arrayProductos) {
        if (arrayProductos.length > 0) {
          nuevoArreglo = arrayProductos.filter(function (producto) {
            if (parseInt(producto.id) == parseInt(num)) {
                return producto;
              }
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
    return nuevoArreglo;
  }

  async actualizaId(num, product) {
    const newProd = { id: Number(num), product };
    const index = this.productos.findIndex((p) => p.id == num);

    if (index !== -1) {
      this.productos[index] = newProd;

      return newProd;
    } else {
      return { error: "Producto no encontrado" };
    }
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

          listaProductos = nuevoArreglo;
          return listaProductos;
        } else {
          return JSON.stringify("El arreglo esta vacío");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  //   async writeAll(arrayNuevo) {
  //     try {
  //       for (let i = 0; i < arrayNuevo.length; i++) {
  //         await fs.appendFileSync(this.nombreArchivo, arrayNuevo[i] + "\n");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   async deleteAll() {
  //     try {
  //       listaProductos.splice(0, listaProductos.length);
  //       console.log(listaProductos);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
}

module.exports = ProductosApi;
