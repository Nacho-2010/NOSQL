const mongoose = require('mongoose');
const { Schema } = mongoose;

const EducacionSchema = new Schema(
  {
    id_nino: {
      type: Schema.Types.ObjectId,
      ref: 'Nino',
      required: true
    },
    centro_educativo: {
      type: String,
      required: true
    },
    nivel: {
      type: String
    },
    rendimiento: {
      type: String 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Educacion', EducacionSchema, 'Educacion');
