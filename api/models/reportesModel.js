const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReporteSchema = new Schema(
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
    autor: {
      type: Schema.Types.ObjectId,
      ref: 'Responsable',
      required: true
    },
    descripcion: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Reporte', ReporteSchema, 'Reportes');
