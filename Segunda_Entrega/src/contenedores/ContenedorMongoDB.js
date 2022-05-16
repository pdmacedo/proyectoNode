const { ConectaMongoDB } = require("../config.js");
const userModel = require("../daos/userModel/productosUserModel.js");
//const userModelCar = require("../daos/userModel/carritosUserModel.js");

class ContenedorMongoDB {
  constructor() {
    ConectaMongoDB();
  }

  //CRUD

  async guardar(elem) {

    const elementSaveModel = new userModel(elem);
    let elementSaved = await elementSaveModel.save(elem);
    console.log(elementSaved);
  }

  async getAll(){
      let element = await userModel.find({});
      console.log(element);
  }

  async getById(cod){
    let element = await userModel.find({codigo: cod});
    console.log(element);
}

  async actualizar(cod){
      let elementUpdate = await userModel.updateOne({codigo: cod}, {
          $set: {stock: 8}
      });

      console.log(elementUpdate);
  }

  async delete(cod){
    let elementDelete = await userModel.deleteOne({codigo: cod});
    console.log(elementDelete);
  }
}

module.exports = ContenedorMongoDB;