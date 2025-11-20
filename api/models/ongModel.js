const mongoose = require('mongoose');
const { Schema } = mongoose;

const OngSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true
    },
    provincia: {
      type: String
    },
    telefono: {
      type: String
    },
    correo: {
      type: String
    },
    capacidad: {
      type: Number
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ong', OngSchema, 'ONG');
