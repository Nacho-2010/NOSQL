const express = require('express');
const route = express.Router();

const Ubicacion = require('../models/ubicacionesModel');

route.post('/', async (req, resp) => {
  try {
    const nuevo = new Ubicacion(req.body);
    const guardado = await nuevo.save();
    resp.status(201).json(guardado);
  } catch (error) {
    resp.status(400).json({ mensaje: error.message });
  }
});

route.get('/', async (req, resp) => {
  try {
    const lista = await Ubicacion.find();
    resp.json(lista);
  } catch (error) {
    resp.status(500).json({ mensaje: error.message });
  }
});



route.delete('/:id', async (req, resp) => {
  try {
    const eliminado = await Ubicacion.findByIdAndDelete(req.params.id);

    if (!eliminado) {
      return resp.status(404).json({ mensaje: 'Ubicación no encontrada' });
    }

    resp.json({ mensaje: 'Ubicación eliminada' });
  } catch (error) {
    resp.status(400).json({ mensaje: error.message });
  }
});

module.exports = route;
