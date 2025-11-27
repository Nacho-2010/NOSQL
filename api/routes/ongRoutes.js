const express = require('express');
const route = express.Router();

const Ong = require('../models/ongModel');

route.post('/', async (req, resp) => {
  try {
    const nuevo = new Ong(req.body);
    const guardado = await nuevo.save();
    resp.status(201).json(guardado);
  } catch (error) {
    resp.status(400).json({ mensaje: error.message });
  }
});

route.get('/', async (req, resp) => {
  try {
    const lista = await Ong.find();
    resp.json(lista);
  } catch (error) {
    resp.status(500).json({ mensaje: error.message });
  }
});

route.put('/:id', async (req, resp) => {
  try {

    const actualizado = await Ong.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },    
      { new: true, runValidators: true }  
    );

    if (!actualizado) {
      return resp.status(404).json({ mensaje: "ONG no encontrada" });
    }

    resp.status(200).json(actualizado);

  } catch (error) {
    resp.status(400).json({ mensaje: error.message });
  }
});


route.delete('/:id', async (req, resp) => {
  try {
    const eliminado = await Ong.findByIdAndDelete(req.params.id);

    if (!eliminado) {
      return resp.status(404).json({ mensaje: 'ONG no encontrada' });
    }

    resp.json({ mensaje: 'ONG eliminada' });
  } catch (error) {
    resp.status(400).json({ mensaje: error.message });
  }
});

module.exports = route;
