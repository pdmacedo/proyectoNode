const express = require('express');
const { Router } = express;

const ProductosApi = require('./contenedores/ContenedorArchivo.js');
const CarritosApi = require('./contenedores/ContenedorArchivo.js');

const app = express();

const productosApi = new ProductosApi('../test/dbProductos.json');
const carritosApi = new CarritosApi('../test/dbCarritos.json');

// Administrador

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

// Router de productos

const productosRouter = new Router();

productosRouter.get('/', async (req, res) => {
    const productos = await productosApi.getAll();
    res.json(productos);
});

productosRouter.get('/:id', async (req, res) => {
    res.json(await productosApi.getById(req.params.id));
});

productosRouter.post('/', soloAdmins, async (req, res) => {
    res.json({ id: await productosApi.save(req.body)});
});

productosRouter.put('/:id', soloAdmins, async (req, res) => {
    res.json(await productosApi.actualizaId(req.body, req.params.id));
});

productosRouter.delete('/:id', soloAdmins, async (req, res) => {
    res.json(await productosApi.delete(req.params.id));
});

// Router de carritos

const carritosRouter = new Router();

carritosRouter.get('/', async (req, res) => {
    res.json(await carritosApi.getAll());
});

// carritosRouter.post('/', async (req, res) => {
//     res.json({ id: await carritosApi.creaCarrito({productos: []})});
// });

carritosRouter.delete('/:id', async (req, res) => {
    res.json(await carritosApi.delete(req.params.id));
});

// carritosRouter.get('/:id/productos', async (req, res) => {
//     res.json(await carritosApi.getById(req.params.id));
// });

// Servidor

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/src/contenedores/ContenedorArchivo', productosRouter);
app.use('/src/contenedores/ContenedorArchivo', carritosRouter);

module.exports = app