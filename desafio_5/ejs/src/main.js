const express = require('express');
const ProductosApi = require('../api/productos.js');

//ROUTER

const productosApi = new ProductosApi();

//SERVIDOR

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', async (req,res) => {
    res.render('index');
})

app.post('/productos', async (req, res) => {
    await productosApi.save(req.body);
    res.redirect('/');
})

app.get('/productos', async (req,res) => {
    const respuesta = await productosApi.getAll();
    res.render('historial', {respuesta});
})

app.listen(8080);