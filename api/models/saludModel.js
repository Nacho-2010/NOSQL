const mongoose = require('mongoose');
const { Schema } = mongoose;

const SaludSchema = new Schema(
  {
    id_nino: {
      type: Schema.Types.ObjectId,
      ref: 'Nino',
      required: true
    },
    fecha: {
      type: Date,
      required: true
    },
    descripcion: {
      type: String,
      required: true
    },
    observaciones: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Salud', SaludSchema, 'Salud');
