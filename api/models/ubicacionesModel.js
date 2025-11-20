const mongoose = require('mongoose');
const { Schema } = mongoose;

const UbicacionSchema = new Schema(
  {
    id_nino: {
      type: Schema.Types.ObjectId,
      ref: 'Nino',
      required: true
    },
    direccion: {
      type: String,
      required: true
    },
    fecha_inicio: {
      type: Date
    }, 
    fecha_fin: {
      type: Date
    }, 
    coordenadas: {
      lat: { type: Number },
      lng: { type: Number }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ubicacion', UbicacionSchema, 'Ubicaciones');
