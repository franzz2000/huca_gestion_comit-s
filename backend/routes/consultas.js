// routes/consultas.js
const express = require('express');
const router = express.Router();
const Persona = require('../models/Persona');
const Reunion = require('../models/Reunion');

// Consultar historial de grupos de un usuario
router.get('/historial-grupos/:id', async (req, res) => {
  try {
    const persona = await Persona.findById(req.params.id).populate('historialGrupos.grupo');
    if (!persona) {
      return res.status(404).json({ msg: 'Persona no encontrada' });
    }

    const historialGrupos = persona.historialGrupos.map(h => {
      const tiempoEnGrupo = (h.fechaSalida || new Date()) - h.fechaIngreso;
      const diasEnGrupo = Math.floor(tiempoEnGrupo / (1000 * 60 * 60 * 24));
      return {
        grupo: h.grupo.denominacion,
        fechaIngreso: h.fechaIngreso,
        fechaSalida: h.fechaSalida || 'Actualmente miembro',
        tiempoEnGrupo: `${diasEnGrupo} días`
      };
    });

    res.json({
      nombre: `${persona.nombre} ${persona.apellidos}`,
      historialGrupos: historialGrupos
    });
  } catch (err) {
    res.status(500).send('Error del servidor');
  }
});

// Consultar cuántas personas asistieron a cada reunión
router.get('/asistencia-reuniones', async (req, res) => {
  try {
    const reuniones = await Reunion.find().populate('grupo');
    const asistenciaInfo = reuniones.map(r => {
      const asistentes = r.asistencias.filter(a => a.estado === 'Asiste').length;
      return {
        reunion: {
          id: r._id,
          grupo: r.grupo.denominacion,
          fecha: r.fecha
        },
        cantidadAsistentes: asistentes
      };
    });

    res.json(asistenciaInfo);
  } catch (err) {
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;