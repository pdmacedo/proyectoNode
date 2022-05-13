const { ConectaMongoDB } = require("../config.js");
const userModel = require("./productos.js");

class ContenedorMongoDB {
  constructor() {
    ConectaMongoDB();
  }

  //CRUD

  async guardar(elem) {

    const usuarioSaveModel = new userModel(elem);
    let userSaved = await usuarioSaveModel.save(elem);
    console.log(userSaved);
  }

  async getAll(){
      let productos = await userModel.find({});
      console.log(productos);
  }

  async getById(cod){
    let producto = await userModel.find({codigo: cod});
    console.log(producto);
}

  async actualizar(cod){
      let productUpdate = await userModel.updateOne({codigo: cod}, {
          $set: {stock: 8}
      });

      console.log(productUpdate);
  }

  async delete(cod){
    let productDelete = await userModel.deleteOne({codigo: cod});
    console.log(productDelete);
  }
}

module.exports = ContenedorMongoDB;
