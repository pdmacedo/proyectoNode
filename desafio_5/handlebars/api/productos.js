class ProductosApi {
    constructor() {
      this.productos = [
        {
          title: "iPhone 10",
          precio: "1000",
          url: "url de la foto",
          id: 1,
        },
        {
          title: "PS5",
          precio: "600",
          url: "url de la foto",
          id: 2,
        },
        {
          title: "PS5",
          precio: "600",
          url: "url de la foto",
          id: 3,
        },
      ];
    }
  
    async save(obj) {
      try {
        let proxId = await this.getNextId();
        obj.id = proxId;
        this.productos.push(obj);
  
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
  
      if (this.productos) {
        return this.productos;
      }
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
  
            this.productos = nuevoArreglo;
            return this.productos;
          } else {
            return JSON.stringify("El arreglo esta vacío");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  module.exports = ProductosApi;
  