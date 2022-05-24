const faker = require('faker');
faker.locale = 'es';

function generarProducto(){
    return{
        nombre: faker.commerce.product(),
        precio: faker.commerce.price(),
        image: faker.image.imageUrl()
    }
}

exports.module = generarProducto;
