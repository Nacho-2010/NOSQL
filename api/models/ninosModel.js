// api/models/ninosModel.js
const mongoose = require('mongoose');

const NinoSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,     
            trim: true
        },
        fecha_nacimiento: {
            type: Date         
        },
        sexo: {
            type: String,
            enum: ['F', 'M', 'Otro'],
            default: null    
        },
        direccion_actual: {
            type: String,
            default: ''
        },
        id_ong: {
            type: String,
            default: null
        },
        estado: {
            type: String,
            enum: ['Activo', 'Egresado', 'Pendiente', 'En seguimiento'],
            default: 'Activo'
        },
        responsable_actual: {
            type: String,
            default: null
        }
    }
);


module.exports = mongoose.model('Nino', NinoSchema, 'Ninos');
