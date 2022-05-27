// const faker = require("faker");
import faker from "faker";
faker.locale = "es";

function generarProducto(numero) {
  for (let i = 0; i <= numero; i++) {
    return {
      nombre: faker.commerce.product(),
      precio: faker.commerce.price(),
      image: faker.image.imageUrl(),
    };
  }
}

export {generarProducto}