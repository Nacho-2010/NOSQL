const express = require('express');
const route = express.Router();

const Abrigo = require('../models/abrigoModel');

// Crear un nuevo abrigo
route.post('/', async (req, resp) => {
    const { nombre, descripcion, estado, correo } = req.body;

    const nuevoAbrigo = new Abrigo({
        nombre,
        descripcion,
        estado,
        correo
    });

    try {
        const abrigoGuardado = await nuevoAbrigo.save();
        resp.status(201).json(abrigoGuardado);
    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});



// Eliminar un abrigo
route.delete('/:id', async (req, resp) => {
    try {
        const abrigoEliminado = await Abrigo.findByIdAndDelete(req.params.id);

        if (!abrigoEliminado) {
            return resp.status(404).json({ mensaje: "Abrigo no encontrado" });
        }

        resp.status(200).json({ mensaje: "Abrigo eliminado" });
    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

// Obtener lista de abrigos
route.get('/', async (req, resp) => {
    try {
        const abrigoDatos = await Abrigo.find();
        resp.json(abrigoDatos);
    } catch (error) {
        resp.status(500).json({ mensaje: error.message });
    }
});

module.exports = route;
