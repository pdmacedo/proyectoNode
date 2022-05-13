const express = require('express');
const ContenedorMongoDB = require('./contenedores/ContenedorMongoDB');
const ContenedorFirebase = require('./contenedores/ContenedorFirebase');
const ContenedorArchivo = require('./contenedores/ContenedorArchivo');
const { Router } = express;

const productosAPi = new ContenedorArchivo('../DB/dbProductos.json');
const carritosAPi = new ContenedorArchivo('../DB/dbCarritos.json');
const prodMongo = new ContenedorMongoDB();
const prodFirebase = new ContenedorFirebase();

const app = express();

//RUTAS CON MÉTODOS PARA MONGO
const productosMongo = new Router();

productosMongo.post('/', async (req, res) =>{
    res.json(await prodMongo.guardar(req.body));
});

productosMongo.get('/', async (req, res) =>{
    res.json(await prodMongo.getAll());
});

productosMongo.get('/:cod', async (req, res) =>{
    res.json(await prodMongo.getById(req.params.cod));
});

productosMongo.put('/:cod', async (req, res) =>{
    res.json(await prodMongo.actualizar(req.params.cod));
});

productosMongo.delete('/:cod', async (req, res) =>{
    res.json(await prodMongo.delete(req.params.cod));
});

//RUTAS CON MÉTODOS PARA FIREBASE
const productosFirebase = new Router();

productosFirebase.post('/', async (req, res) =>{
    res.json(await prodFirebase.guardar(req.body));
    //console.log(req.body);
});

productosFirebase.get('/', async (req, res) =>{
    res.json(await prodFirebase.getAll());
});

productosFirebase.get('/:cod', async (req, res) =>{
    res.json(await prodFirebase.getById(req.params.cod));
});

productosFirebase.put('/:cod', async (req, res) =>{
    res.json(await prodFirebase.actualizar(req.params.cod));
});

productosFirebase.delete('/:cod', async (req, res) =>{
    res.json(await prodFirebase.delete(req.params.cod));
});


// ROUTER CON MÉTODOS PARA PRODUCTOS DE CONTENEDOR ARCHIVO
const productosRouter = new Router();

productosRouter.get('/:id?', async (req, res) =>{
    if(req.params.id){
        res.json( await productosAPi.listar(req.params.id));
    }else{
        res.json(await productosAPi.listarAll());
    }
});

productosRouter.post('/', soloAdmins, async (req, res) =>{
    res.json(await productosAPi.guardar(req.body));
});

productosRouter.put('/:id', soloAdmins, async (req, res) =>{
    res.json(await productosAPi.actualizar(req.body, req.params.id));
});

productosRouter.delete('/:id', soloAdmins, async (req, res) =>{
    res.json(await productosAPi.borrar(req.params.id));
});

// ROUTER CON MÉTODOS PARA CARRITOS DE CONTENEDOR ARCHIVO
const carritosRouter = new Router()

carritosRouter.post('/', async (req, res) =>{
    res.json(await carritosAPi.guardar(req.body))
});

carritosRouter.delete('/:id', async (req, res) =>{
    res.json(await carritosAPi.borrar(req.params.id))
});

carritosRouter.get('/:id?/productos', async (req, res) =>{
    res.json(await carritosAPi.listar(req.params.id))
});

carritosRouter.post('/:id?/productos/:id_Carro?', async (req, res) =>{
    res.json(await carritosAPi.guardarPorId(req.params.id, req.params.id_Carro))
});

carritosRouter.delete('/:id?/productos/:id_prod?', async (req, res) =>{
    res.json(await carritosAPi.eliminarDelCarrito(req.params.id, req.params.id_prod))
});

// Configuro el servidor

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/mongo', productosMongo);
app.use('/firebase', productosFirebase);
app.use('/api/productos', productosRouter);
app.use('/api/carritos', carritosRouter);


// Conexión al servidor

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando ${server.address().port}`);
  });
  
  server.on("error", (error) => console.log(`Error en el servidor ${error}`));