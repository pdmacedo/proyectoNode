const ContenedorArchivo = require('./contenedores/ContenedorArchivo');
const express = require('express');

class ProductosRouter extends express.Router{
    constructor(){
        super();

        const apiUsuarios = new ContenedorArchivo();

        this.post('/popular', async(req, res, next) => {
            try {
                res.json(await apiUsuarios.popular(req.query.cant))
            } catch (error) {
                next(error);
            }
        });

        this.get('/', async (req, res, next) => {
            try {
                res.json(await apiUsuarios.listarAll());
            } catch (error) {
                next(error);
            }
        });

        this.get('/:id', async (req, res, next) => {
            try {
                res.json(await apiUsuarios.listar(req.params.id));
            } catch (error) {
                next(error);
            }
        });

        this.post('/:id', async (req, res, next) => {
            try {
                res.json(await apiUsuarios.guardar(req.body));
            } catch (error) {
                next(error);
            }
        });

        this.put('/:id', async (req, res, next) => {
            try {
                res.json(await apiUsuarios.actualizar({...req.body, id: req.params.id}));
            } catch (error) {
                next(error);
            }
        });

        this.delete('/:id', async (req, res, next) => {
            try {
                res.json(await apiUsuarios.borrar(req.params.id));
            } catch (error) {
                next(error);
            }
        });
    }
}

module.exports = ProductosRouter;