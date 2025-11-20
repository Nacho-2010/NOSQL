const mongoose = require('mongoose');

const AbrigoSchema = new mongoose.Schema(
    {        
        nombre: {
            type: String,
            required: true
        },
        descripcion: {
            type: String,
            required: true
        }, 
        estado: {
            type: String,
            enum: ['Activo','Inactivo','Pendiente'],
            required: true,
            default: 'Activo'
        }, 
        correo: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('Abrigo', AbrigoSchema, 'Abrigos');

