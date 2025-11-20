const mongoose = require('mongoose');
const { Schema } = mongoose;

const FamiliarSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true
    },
    parentesco: {
      type: String 
      
    },
    telefono: {
      type: String
    },
    estado_contacto: {
      type: String,
      enum: ['Sin contacto', 'Contacto esporádico', 'Contacto frecuente'],
      default: 'Sin contacto'
    },
    id_nino: {
      type: Schema.Types.ObjectId,
      ref: 'Nino',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Familiar', FamiliarSchema, 'Familiares');
