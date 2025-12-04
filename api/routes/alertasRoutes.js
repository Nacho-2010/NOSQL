const express = require('express');
const route = express.Router();

const Alerta = require('../models/alertasModel');

route.post('/', async (req, resp) => {
  try {
    const nuevo = new Alerta(req.body);
    const guardado = await nuevo.save();
    resp.status(201).json(guardado);
  } catch (error) {
    resp.status(400).json({ mensaje: error.message });
  }
});

route.get('/', async (req, resp) => {
  try {
    const lista = await Alerta.find();
    resp.json(lista);
  } catch (error) {
    resp.status(500).json({ mensaje: error.message });
  }
});

// UPDATE
route.put('/:id', async (req, resp) => {
  try {
    const alertaActualizada = await Alerta.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!alertaActualizada) {
      return resp.status(404).json({ mensaje: "Alerta no encontrada" });
    }

    resp.status(200).json(alertaActualizada);
  } catch (error) {
    resp.status(400).json({ mensaje: error.message });
  }
});

// DELETE
route.delete('/:id', async (req, resp) => {
  try {
    const eliminado = await Alerta.findByIdAndDelete(req.params.id);

    if (!eliminado) {
      return resp.status(404).json({ mensaje: 'Alerta no encontrada' });
    }

    resp.json({ mensaje: 'Alerta eliminada' });
  } catch (error) {
    resp.status(400).json({ mensaje: error.message });
  }
});

module.exports = route;