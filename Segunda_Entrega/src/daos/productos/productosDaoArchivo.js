const ContenedorArchivo = require('../../contenedores/ContenedorArchivo');

class ProductosDaoArchivo extends ContenedorArchivo{
    constructor(){
        super('productos');
    }

}

module.exports = ProductosDaoArchivo;