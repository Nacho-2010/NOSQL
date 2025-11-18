const mongoose = require('mongoose');

const CursoSchema = new mongoose.Schema(
        {        
            nombre:{
                type: String,
                require: true
            }
            , descripcion:{
                type: String,
                require: true
            }, 
            estado:{
                type: String,
                enum: ['Activo','Inactivo', 'Pendiente'],
                require: true,
                default:'Activo'
            }, 
            correo:{
                type: String,
                require: true
            }
        }
);

module.exports = mongoose.model('Curso', CursoSchema);