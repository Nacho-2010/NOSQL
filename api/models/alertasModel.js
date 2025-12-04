const mongoose = require('mongoose');
const { Schema } = mongoose;

const AlertaSchema = new Schema(
  {
    id_nino: {
      type: Schema.Types.ObjectId,
      ref: 'Nino',
      required: true
    },
    tipo_alerta: {
      type: String,
      required: true
    },
    fecha_generada: {
      type: Date,
      required: true
    },
    dias_restantes: {
      type: Number
    },
    estado: {
      type: String,
      enum: ['Pendiente', 'Atendida', 'Vencida'],
      default: 'Pendiente'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Alerta', AlertaSchema, 'Alertas');