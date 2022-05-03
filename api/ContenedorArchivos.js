class ProductosApi {
  constructor() {
    this.productos = [];
  }

  save(obj) {
    try {
      let proxId = this.getNextId();
      obj.id = proxId;
      this.productos.push(obj);

      return JSON.stringify("Agregado correctamente");
    } catch (error) {
      console.log(error);
    }

    return JSON.stringify("Lo sentimos, no se pudo guardar");
  }

  getNextId() {
    let id = 1;

    try {
      let arrayProductos = this.getAll();

      if (arrayProductos.length > 0) {
        id = parseInt(arrayProductos[arrayProductos.length - 1].id) + 1;
      }
      return id;
    } catch (error) {
      console.log(error);
    }
  }

  getAll() {

    if (this.productos) {
      return this.productos;
    }
  }
}

module.exports = ProductosApi;
