const mongoose = require('mongoose');
const { Schema } = mongoose;

const HermanoSchema = new Schema(
  {
    id_nino: {
      type: Schema.Types.ObjectId,
      ref: 'Nino',
      required: true
    },
    id_hermano: {
      type: Schema.Types.ObjectId,
      ref: 'Nino',
      required: true
    },
    tipo: {
      type: String 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Hermano', HermanoSchema, 'Hermanos');
