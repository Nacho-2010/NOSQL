const mongoose = require('mongoose');

const AdopcionSchema = new mongoose.Schema(
    {
        id_nino: {
            type: String,
            required: true
        },
        tipo: {                    
            type: String,
            required: true
        },
        fecha: {
            type: Date,
            required: true
        },
        detalles: {
            type: String
        }
    }
);

module.exports = mongoose.model('Adopcion', AdopcionSchema, 'Adopciones');
