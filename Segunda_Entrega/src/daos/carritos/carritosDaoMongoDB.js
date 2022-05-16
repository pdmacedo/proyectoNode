const ContenedorMongoDB = require('../../contenedores/ContenedorMongoDB');

class CarritosDaoMongoDB extends ContenedorMongoDB{
    constructor(){
        super('carritos');
    }

    async guardar(carrito = {productos:[]}){
        return super.guardar(carrito);
    }
}

module.exports = CarritosDaoMongoDB;