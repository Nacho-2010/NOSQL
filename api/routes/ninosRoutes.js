const express = require('express');
const route = express.Router();

const Nino = require('../models/ninosModel');

// Crear niño
route.post('/', async (req, resp) => {
  try {
    const nuevoNino = new Nino(req.body);
    const ninoGuardado = await nuevoNino.save();
    resp.status(201).json(ninoGuardado);
  } catch (error) {
    resp.status(400).json({ mensaje: error.message });
  }
});

// Listar niños
route.get('/', async (req, resp) => {
  try {
    const ninos = await Nino.find();
    resp.json(ninos);
  } catch (error) {
    resp.status(500).json({ mensaje: error.message });
  }
});

route.put('/:id', async(req, resp) =>{

       try {

               const ninoActualizado = await Nino.findByIdAndUpdate(
                         req.params.id,
                         req.body,
                         {new: true}

                    );

               if (!ninoActualizado){
                    return resp.status(404).json({mesaje: "Niño no encontrado"});
               }
            
               resp.status(200).json(ninoActualizado);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);


// Eliminar niño
route.delete('/:id', async (req, resp) => {
  try {
    const ninoEliminado = await Nino.findByIdAndDelete(req.params.id);

    if (!ninoEliminado) {
      return resp.status(404).json({ mensaje: 'Niño no encontrado' });
    }

    resp.json({ mensaje: 'Niño eliminado' });
  } catch (error) {
    resp.status(400).json({ mensaje: error.message });
  }
});

module.exports = route;
