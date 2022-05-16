const ContenedorMongoDB = require('../../contenedores/ContenedorMongoDB');

class ProductosDaoMongoDB extends ContenedorMongoDB{
    constructor(){
        super('productos')
    }

}

module.exports = ProductosDaoMongoDB;