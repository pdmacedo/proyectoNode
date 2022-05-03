const express = require('express');
const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');
const MysqlDB = require('./api/ContenedorSQL');

// Instancio servidor, socket y api

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const conexMDB = new MysqlDB(optionsMDB, 'productos');
const conexLite = new MysqlDB(optionsLite, 'mensajes');

const productos = conexMDB.getAll();
const mensajes = conexLite.getAll();

// Configuro el socket

io.on('connection',  (socket) => {
    console.log('Nuevo cliente conectado!');
    socket.emit('mensajes', mensajes);
    socket.emit('productos', productos);

    socket.on('new-message', mes => {
        mensajes.addProduct(mes);
        io.sockets.emit('mensajes', mensajes);
    });

    socket.on('new-product', product => {
        productos.save(product);
        io.sockets.emit('productos', productos);
    });
    
});

// Agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Servidor

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))