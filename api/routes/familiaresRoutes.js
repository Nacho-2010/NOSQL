const express = require('express');
const route = express.Router();

const Familiar = require('../models/familiaresModel');

route.post('/', async (req, resp) => {
  try {
    const nuevo = new Familiar(req.body);
    const guardado = await nuevo.save();
    resp.status(201).json(guardado);
  } catch (error) {
    resp.status(400).json({ mensaje: error.message });
  }
});

route.get('/', async (req, resp) => {
  try {
    const lista = await Familiar.find();
    resp.json(lista);
  } catch (error) {
    resp.status(500).json({ mensaje: error.message });
  }
});



route.delete('/:id', async (req, resp) => {
  try {
    const eliminado = await Familiar.findByIdAndDelete(req.params.id);

    if (!eliminado) {
      return resp.status(404).json({ mensaje: 'Familiar no encontrado' });
    }

    resp.json({ mensaje: 'Familiar eliminado' });
  } catch (error) {
    resp.status(400).json({ mensaje: error.message });
  }
});

module.exports = route;
