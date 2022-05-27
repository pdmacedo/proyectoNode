const faker = require("faker");
faker.locale = "es";

function generarProducto(numero) {
  for (i = 0; i <= numero; i++) {
    return {
      nombre: faker.commerce.product(),
      precio: faker.commerce.price(),
      image: faker.image.imageUrl(),
    };
  }
}

exports.module = generarProducto;
