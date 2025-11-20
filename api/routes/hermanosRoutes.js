const express = require('express');
const route = express.Router();

const Hermano = require('../models/hermanosModel');

route.post('/', async (req, resp) => {
  try {
    const nuevo = new Hermano(req.body);
    const guardado = await nuevo.save();
    resp.status(201).json(guardado);
  } catch (error) {
    resp.status(400).json({ mensaje: error.message });
  }
});

route.get('/', async (req, resp) => {
  try {
    const lista = await Hermano.find();
    resp.json(lista);
  } catch (error) {
    resp.status(500).json({ mensaje: error.message });
  }
});

route.delete('/:id', async (req, resp) => {
  try {
    const eliminado = await Hermano.findByIdAndDelete(req.params.id);

    if (!eliminado) {
      return resp.status(404).json({ mensaje: 'Registro de hermano no encontrado' });
    }

    resp.json({ mensaje: 'Registro de hermano eliminado' });
  } catch (error) {
    resp.status(400).json({ mensaje: error.message });
  }
});

module.exports = route;
