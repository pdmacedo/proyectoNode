const express = require("express");
const { Router } = express;
const ProductosApi = require('./api/productos.js');

//ROUTER

const productosApi = new ProductosApi('dbProductos.json');
const productosRouter = new Router();

//SERVIDOR
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', './views');
app.set('view engine', 'ejs');
app.use('/api/productos', productosRouter);

//ADMINISTRADOR

const admin = true;

function errorNoAdmin(ruta, metodo) {
    const error = { error: -1,}
    if(ruta && metodo){
        error.descripcion = `Ruta: '${ruta}'. Metodo: ${metodo} no autorizado`;
    } else{
        error.descripcion = 'No autorizado';
    }
    return error;
}

function soloAdmins(req, res, next) {
    if(!admin){
        res.json(errorNoAdmin());
    } else{
        next();
    }
}

//LLAMAR A LOS MÉTODOS CON LAS RUTAS

app.get('/', async (req,res) => {
    res.render('index');
})

app.get('/api/productos', async (req,res) => {
    const respuesta = await productosApi.getAll();
    res.render('makeProductos', {respuesta});
})

app.get('/api/productos/:id', async (req,res) => { 
    const respuesta= await productosApi.getById(req.params.id);
    res.render('makeProductos', {respuesta});
})

app.post('/api/productos', soloAdmins, async (req,res) => {
    const respuesta = await productosApi.save(req.body);
    res.send(respuesta);
})

app.put('/api/productos/:id', soloAdmins, async (req,res) => {
    const respuesta = await productosApi.actualizaId(req.params.id, req.body);
    res.send(respuesta);
})

app.delete('/api/productos/:id', async (req,res) => { 
    const respuesta= await productosApi.deleteById(req.params.id);
    res.send(respuesta);
})

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando ${server.address().port}`);
  });
  
  server.on("error", (error) => console.log(`Error en el servidor ${error}`));