import express from "express";
import { Server as Socket } from "socket.io";
import { Server as HttpServer } from "http";
import ContenedorArchivo from "./contenedores/ContenedorArchivo.js";
import ContenedorSQL from "./contenedores/ContenedorSQL.js";
import CrearTabla from "../scripts/crearTablas.js";
import { normalize, schema } from "normalizr";
import { generarProducto } from "../utils/generarProductos.js";
import optionsMDB from "./config.js";

//------------------------------------------------------------------------------------

// Instancio servidor, socket y api
const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

const productosApi = new ContenedorSQL(optionsMDB, "productos");
const mensajesApi = new ContenedorArchivo("../DesafioFaker/DB/mensajes.json");

// Creo las tablas
const tablaProduct = new CrearTabla();
tablaProduct.creaTablaProduct();

// Normalización de mensajes
//Definir un esquema de author
const authorSchema = new schema.Entity("authors", {}, { idAttribute: "email" });

//Definir un esquema de mensajes
const messageSchema = new schema.Entity("comments", {
  author: authorSchema,
  idAttribute: "id"
});

//Definir un esquema de post
const postSchema = new schema.Entity("posts", {
  comments: [messageSchema],
  idAttribute: "id"
});

function listarMensajesNormalizados() {
  let productDB = mensajesApi.listarAll();
  const normalizrData = normalize(productDB, postSchema);
  return normalizrData;
}

// Configuro el socket
const productos = productosApi.listarAll();
const mensajes = listarMensajesNormalizados();

io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado!");
  await socket.emit("mensajes", mensajes);
  socket.emit("productos", productos);

  socket.on("new-message", (message) => {
    mensajesApi.guardar(message);
    io.sockets.emit("mensajes", mensajes);
  });

  socket.on("new-product", (product) => {
    productosApi.guardar(product);
    io.sockets.emit("productos", productos);
  });
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Rutas
app.get("/api/productos-test", (req, res) => {
  res.json(generarProducto(5));
});

app.get("/api/mensajes-normalizados", (req, res) => {
  res.json(listarMensajesNormalizados());
});

// Inicio el servidor
const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
  console.log(
    `Servidor http escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);
