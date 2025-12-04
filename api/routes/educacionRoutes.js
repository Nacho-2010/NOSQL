const express = require('express');
const route = express.Router();

const Educacion = require('../models/educacionModel');

route.post('/', async (req, resp) => {
  try {
    const nuevo = new Educacion(req.body);
    const guardado = await nuevo.save();
    resp.status(201).json(guardado);
  } catch (error) {
    resp.status(400).json({ mensaje: error.message });
  }
});

route.get('/', async (req, resp) => {
  try {
    const lista = await Educacion.find();
    resp.json(lista);
  } catch (error) {
    resp.status(500).json({ mensaje: error.message });
  }
});

route.put('/:id', async (req, resp) => {
  try {
    const educacionActualizada = await Educacion.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!educacionActualizada) {
      return resp.status(404).json({ mensaje: "Historial de educación no encontrado" });
    }

    resp.status(200).json(educacionActualizada);
  } catch (error) {
    resp.status(400).json({ mensaje: error.message });
  }
});

route.delete('/:id', async (req, resp) => {
  try {
    const eliminado = await Educacion.findByIdAndDelete(req.params.id);

    if (!eliminado) {
      return resp.status(404).json({ mensaje: 'Registro educativo no encontrado' });
    }

    resp.json({ mensaje: 'Registro educativo eliminado' });
  } catch (error) {
    resp.status(400).json({ mensaje: error.message });
  }
});

module.exports = route;
