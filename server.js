const express = require("express");
const Contenedor = require("./Contenedor.js");
const contenedor = new Contenedor("./productos.txt");

const app = express();

app.get("/", (req, res) => {
  res.send({ mensaje: "Desafio 3" });
});

app.get("/productos", async (req, res) => {
  const prods = await contenedor.getAll();
  res.send(prods);
});

app.get("/productoRandom", async (req, res) => {
  const aleatorio = await contenedor.getById(2);
  res.send(aleatorio);
});

const server = app.listen(8080, () => {
  console.log("Desafio 3:");
});

server.on("error", (error) => console.log(`Error en el servidor ${error}`));
