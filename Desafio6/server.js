const express = require('express');
const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');

const ContenedorMemoria = require('./api/ContenedorMemoria.js');
const ContenedorArchivo = require('./api/ContenedorArchivo.js');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const productosApi = new ContenedorMemoria();
const mensajesApi = new ContenedorArchivo('mensajes.json');

app.use(express.static('./public'));

app.get('/', async (req,res) => {
    res.sendFile('index.html', { root:__dirname });
});

const messages = mensajesApi.getAll();
const productos = productosApi.getAll();

io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages);
    socket.emit('producto', productos);

    socket.on('new-message', message => {
        mensajesApi.save(message);
        io.sockets.emit('messages', messages);
    });

    socket.on('new-product', product => {
        productosApi.save(product);
        console.log(productos);
        io.sockets.emit('producto', productos);
    });

});

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`);
});
connectedServer.on('error', error => console.log(`Error en servidor ${error}`));