const express = require('express');
const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');
const ContenedorSQL = require('./contenedores/ContenedorSQL.js');
const { optionsMDB, optionsLite } = require("../src/config");
const { Router } = require('express');
const CrearTabla = require('../scripts/crearTablas');

// Instancio servidor, socket y api
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const productosApi = new ContenedorSQL(optionsMDB, 'productos');
const mensajesApi = new ContenedorSQL(optionsLite, 'mensajes');

//Creo las tablas
const tablaProduct = new CrearTabla();
const tablaMensaje = new CrearTabla();

tablaProduct.creaTablaProduct();
tablaMensaje.creaTablaMensaje();

// Configuro el socket

const mensajes = mensajesApi.listarAll();
const productos = productosApi.listarAll();

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado!');
    socket.emit('messages', mensajes);
    socket.emit('productos', productos);

    socket.on('new-message', message => {
        mensajesApi.guardar(message);
        io.sockets.emit('messages', mensajes);
    });

    socket.on('new-product', product => {
        productosApi.guardar(product);
        io.sockets.emit('productos', productos);
    });
});

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//PARA PROBAR LOS METODOS ACTUALIZAR Y BORRAR

//Router productos
const productosRouter = new Router();

productosRouter.put('/:ids', async (req, res) =>{
    res.json(await productosApi.actualizar(req.body, req.params.id))
});

productosRouter.delete('/:id', async (req, res) =>{
    res.json(await productosApi.borrar(req.params.id))
});

productosRouter.delete('/', async (req, res) =>{
    res.json(await productosApi.borrarAll())
});

//Router mensajes
const mensajesRouter = new Router();

mensajesRouter.put('/:ids', async (req, res) =>{
    res.json(await mensajesApi.actualizar(req.body, req.params.id))
});

mensajesRouter.delete('/:id', async (req, res) =>{
    res.json(await mensajesApi.borrar(req.params.id))
});

mensajesRouter.delete('/', async (req, res) =>{
    res.json(await mensajesApi.borrarAll())
});

app.use('/api/productos', productosRouter);
app.use('/api/mensajes', mensajesRouter);

// Inicio el servidor

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
