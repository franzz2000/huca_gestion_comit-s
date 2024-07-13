// models/Persona.js
const mongoose = require('mongoose');

const HistorialGrupoSchema = new mongoose.Schema({
  grupo: { type: mongoose.Schema.Types.ObjectId, ref: 'Grupo' },
  fechaIngreso: { type: Date, required: true },
  fechaSalida: { type: Date }
});

const PersonaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellidos: { type: String, required: true },
  puestoTrabajo: String,
  correoElectronico: { type: String, unique: true },
  telefonoContacto: String,
  observaciones: String,
  historialGrupos: [HistorialGrupoSchema]
});

module.exports = mongoose.model('Persona', PersonaSchema);