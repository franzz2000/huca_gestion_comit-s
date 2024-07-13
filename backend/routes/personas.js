// routes/personas.js
const express = require('express');
const router = express.Router();
const Persona = require('../models/Persona');

// Obtener todas las personas
router.get('/', async (req, res) => {
  try {
    const personas = await Persona.find();
    res.json(personas);
  } catch (err) {
    res.status(500).send('Error del servidor');
  }
});

// Crear una nueva persona
router.post('/', async (req, res) => {
  try {
    const nuevaPersona = new Persona(req.body);
    await nuevaPersona.save();
    res.status(201).json(nuevaPersona);
  } catch (err) {
    res.status(400).send('Error al crear la persona');
  }
});

// Actualizar una persona
router.put('/:id', async (req, res) => {
  try {
    const persona = await Persona.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(persona);
  } catch (err) {
    res.status(400).send('Error al actualizar la persona');
  }
});

// Eliminar una persona
router.delete('/:id', async (req, res) => {
  try {
    await Persona.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Persona eliminada' });
  } catch (err) {
    res.status(400).send('Error al eliminar la persona');
  }
});

// Unirse a un grupo
router.post('/:id/unirse-grupo/:grupoId', async (req, res) => {
  try {
    const persona = await Persona.findById(req.params.id);
    if (!persona) {
      return res.status(404).json({ msg: 'Persona no encontrada' });
    }

    const nuevaEntrada = {
      grupo: req.params.grupoId,
      fechaIngreso: new Date()
    };

    persona.historialGrupos.push(nuevaEntrada);
    await persona.save();

    res.json(persona);
  } catch (err) {
    res.status(500).send('Error del servidor');
  }
});

// Dejar un grupo
router.post('/:id/dejar-grupo/:grupoId', async (req, res) => {
  try {
    const persona = await Persona.findById(req.params.id);
    if (!persona) {
      return res.status(404).json({ msg: 'Persona no encontrada' });
    }

    const entradaGrupo = persona.historialGrupos.find(
      h => h.grupo.toString() === req.params.grupoId && !h.fechaSalida
    );

    if (entradaGrupo) {
      entradaGrupo.fechaSalida = new Date();
      await persona.save();
    }

    res.json(persona);
  } catch (err) {
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;