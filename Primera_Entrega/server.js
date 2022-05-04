const express = require('express')
const { Router } = express

const ContenedorArchivo = require('./src/ContenedorArchivo')

const productosAPi = new ContenedorArchivo('./dbProductos.json');
const carritosAPi = new ContenedorArchivo('./dbCarritos.json');

// Instancio servidor y persistencia

const app = express()

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

// Configuro router de productos

const productosRouter = new Router()

productosRouter.get('/:id?', async (req, res) =>{
    if(req.params.id){
        res.json( await productosAPi.listar(req.params.id))
    }else{
        res.json(await productosAPi.listarAll())
    }
});

productosRouter.post('/', soloAdmins, async (req, res) =>{
    res.json(await productosAPi.guardar(req.body))
})

productosRouter.put('/:id', soloAdmins, async (req, res) =>{
    res.json(await productosAPi.actualizar(req.body, req.params.id))
})

productosRouter.delete('/:id', soloAdmins, async (req, res) =>{
    res.json(await productosAPi.borrar(req.params.id))
})

//--------------------------------------------
// configuro router de carritos

const carritosRouter = new Router()

carritosRouter.post('/', async (req, res) =>{
    res.json(await carritosAPi.guardar(req.body))
})

carritosRouter.delete('/:id', async (req, res) =>{
    res.json(await carritosAPi.borrar(req.params.id))
})

carritosRouter.get('/:id?/productos', async (req, res) =>{
    res.json(await carritosAPi.listar(req.params.id))
});

carritosRouter.post('/:id?/productos/:id_Carro?', async (req, res) =>{
    res.json(await carritosAPi.guardarPorId(req.params.id, req.params.id_Carro))
})


carritosRouter.delete('/:id?/productos/:id_prod?', async (req, res) =>{
    res.json(await carritosAPi.eliminarDelCarrito(req.params.id, req.params.id_prod))
})


//--------------------------------------------
// configuro el servidor

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/productos', productosRouter)
app.use('/api/carritos', carritosRouter)

module.exports = app