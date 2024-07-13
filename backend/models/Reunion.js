// models/Reunion.js
const mongoose = require('mongoose');

const AsistenciaSchema = new mongoose.Schema({
  persona: { type: mongoose.Schema.Types.ObjectId, ref: 'Persona' },
  estado: { type: String, enum: ['Asiste', 'No asiste', 'Excusa'], required: true }
});

const ReunionSchema = new mongoose.Schema({
  grupo: { type: mongoose.Schema.Types.ObjectId, ref: 'Grupo', required: true },
  fecha: { type: Date, required: true },
  asistencias: [AsistenciaSchema],
  observaciones: String
});

module.exports = mongoose.model('Reunion', ReunionSchema);