const express = require('express');
const route = express.Router();

const Responsable = require('../models/responsablesModel');

route.post('/', async (req, resp) => {
  try {
    const nuevo = new Responsable(req.body);
    const guardado = await nuevo.save();
    resp.status(201).json(guardado);
  } catch (error) {
    resp.status(400).json({ mensaje: error.message });
  }
});

route.get('/', async (req, resp) => {
  try {
    const lista = await Responsable.find();
    resp.json(lista);
  } catch (error) {
    resp.status(500).json({ mensaje: error.message });
  }
});

route.put('/:id', async(req, resp) =>{

       try {

               const responsableActualizado = await Responsable.findByIdAndUpdate(
                         req.params.id,
                         req.body,
                         {new: true}

                    );

               if (!responsableActualizado){
                    return resp.status(404).json({mesaje: "Responsable no encontrado"});
               }
            
               resp.status(200).json(responsableActualizado);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);

route.delete('/:id', async (req, resp) => {
  try {
    const eliminado = await Responsable.findByIdAndDelete(req.params.id);

    if (!eliminado) {
      return resp.status(404).json({ mensaje: 'Responsable no encontrado' });
    }

    resp.json({ mensaje: 'Responsable eliminado' });
  } catch (error) {
    resp.status(400).json({ mensaje: error.message });
  }
});

module.exports = route;
