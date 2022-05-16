const ContenedorArchivo = require('../../contenedores/ContenedorArchivo');

class CarritosDaoArchivo extends ContenedorArchivo{
    constructor(){
        super('carritos');
    }

    async guardar(carrito = {productos:[]}){
        return super.guardar(carrito);
    }

}

module.exports = CarritosDaoArchivo;