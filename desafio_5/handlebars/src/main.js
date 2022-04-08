const express = require('express');
const handlebars = require('express-handlebars');
const ProductosApi = require('../api/productos.js');

const productosApi = new ProductosApi();

const app = express();
//const path = require('path');

app.engine(
    'hbs', handlebars({
        extname: '.hbs',
        defaultLayout: 'index',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials'
    })
)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname + '../index')));
app.set('view engine', 'hbs');
app.set('views', './src/views');

app.get('/', async (req,res) => {
    res.render('main');
})

app.post('/productos', async (req, res) => {
    await productosApi.save(req.body);
    res.redirect('/');
})

app.get('/productos', async (req,res) => {
    const respuesta = await productosApi.getAll();
    res.render('partials/historial', {respuesta, listExist: true});
})

app.listen(8080);