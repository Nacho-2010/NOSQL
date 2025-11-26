const express = require('express');
const route = express.Router();

const Adopcion = require('../models/adopcionesModel');


// Crear 
route.post('/', async (req, res) => {
    const { id_nino, tipo, fecha, detalles } = req.body;

    const nuevaAdopcion = new Adopcion({
        id_nino,
        tipo,
        fecha,
        detalles
    });

    try {
        const adopcionGuardada = await nuevaAdopcion.save();
        res.status(201).json(adopcionGuardada);
    } catch (error) {
        console.error('Error al guardar adopción:', error.message);
        res.status(400).json({ mensaje: error.message });
    }
});


// Obtener 
route.get('/', async (req, res) => {
    try {
        const adopciones = await Adopcion.find();
        res.json(adopciones);        
    } catch (error) {
        console.error('Error al obtener adopciones:', error.message);
        res.status(500).json({ mensaje: error.message });
    }
});

route.put('/:id', async(req, resp) =>{

       try {

               const adopcionActualizado = await Adopcion.findByIdAndUpdate(
                         req.params.id,
                         req.body,
                         {new: true}

                    );

               if (!adopcionActualizado){
                    return resp.status(404).json({mesaje: "Adopcion no encontrada"});
               }
            
               resp.status(200).json(adopcionActualizado);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);

// eliminar una adopción
route.delete('/:id', async (req, res) => {
    try {
        const adopcionEliminada = await Adopcion.findByIdAndDelete(req.params.id);

        if (!adopcionEliminada) {
            return res.status(404).json({ mensaje: 'Adopción no encontrada' });
        }

        res.status(200).json({ mensaje: 'Adopción eliminada' });
    } catch (error) {
        console.error('Error al eliminar adopción:', error.message);
        res.status(400).json({ mensaje: error.message });
    }
});


module.exports = route;
