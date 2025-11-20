const mongoose = require('mongoose');
const { Schema } = mongoose;

const VisitaSchema = new Schema(
  {
    id_nino: {
      type: Schema.Types.ObjectId,
      ref: 'Nino',
      required: true
    },
    visitante: {
      type: String,
      required: true
    },
    fecha: {
      type: Date,
      required: true
    },
    observaciones: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Visita', VisitaSchema, 'Visitas');
