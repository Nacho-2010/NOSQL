const mongoose = require('mongoose');
const { Schema } = mongoose;

const ResponsableSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true
    },
    cargo: {
      type: String
    },
    telefono: {
      type: String
    },
    correo: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Responsable', ResponsableSchema, 'Responsables');
