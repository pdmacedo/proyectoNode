const express = require("express");
const { Router } = express;
const ProductosApi = require('./api/productos.js');

//ROUTER

const productosApi = new ProductosApi();
const productosRouter = new Router();

//SERVIDOR
const app = express();
app.use(express.static('public'));
productosRouter.use(express.json());
productosRouter.use(express.urlencoded({extended: true}));
app.use('/api/productos', productosRouter);

//LLAMAR A LOS MÉTODOS CON LAS RUTAS

app.get('/api/productos', async (req,res) => {
    const respuesta = await productosApi.getAll();
    res.send(respuesta);
})

app.get('/api/productos/:id', async (req,res) => { 
    const id = req.params.id;
    const respuesta= await productosApi.getById(id);
    res.send(respuesta);
})

app.post('/api/productos', async (req,res) => {
    const respuesta = await productosApi.save(req.body);
    res.send(respuesta);
})

app.put('/api/productos/:id', async (req,res) => {
    const id = req.params.id;
    const productActualizado = req.body;
    const respuesta = await productosApi.actualizaId(id, productActualizado);
    res.send(respuesta);
})

app.delete('/api/productos/:id', async (req,res) => { 
    const id = req.params.id;
    const respuesta= await productosApi.deleteById(id);
    res.send(respuesta);
})

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando ${server.address().port}`);
  });
  
  server.on("error", (error) => console.log(`Error en el servidor ${error}`));