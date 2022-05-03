class MensajesApi {
    constructor() {
      this.archivos = [];
    }
  
    save(msg) {
      try {
        this.archivos.push(msg);
  
        return JSON.stringify("Agregado correctamente");
      } catch (error) {
        console.log(error);
      }
  
      return JSON.stringify("Lo sentimos, no se pudo guardar");
    }
  
    getAll() {
  
      if (this.archivos) {
        return this.archivos;
      }
    }
  }
  
  module.exports = MensajesApi;
  