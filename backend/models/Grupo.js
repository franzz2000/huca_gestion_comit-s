// models/Grupo.js
const mongoose = require('mongoose');

const GrupoSchema = new mongoose.Schema({
  tipo: { type: String, enum: ['Tipo1', 'Tipo2'], required: true },
  denominacion: { type: String, required: true },
  fechaConstitucion: Date,
  fechaCierre: Date,
  observaciones: String
});

module.exports = mongoose.model('Grupo', GrupoSchema);
