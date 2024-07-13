// routes/reuniones.js
const express = require('express');
const router = express.Router();
const Reunion = require('../models/Reunion');

// Obtener todas las reuniones
router.get('/', async (req, res) => {
  try {
    const reuniones = await Reunion.find().populate('grupo').populate('asistencias.persona');
    res.json(reuniones);
  } catch (err) {
    res.status(500).send('Error del servidor');
  }
});

// Crear una nueva reunión
router.post('/', async (req, res) => {
  try {
    const nuevaReunion = new Reunion(req.body);
    await nuevaReunion.save();
    res.status(201).json(nuevaReunion);
  } catch (err) {
    res.status(400).send('Error al crear la reunión');
  }
});

// Actualizar una reunión
router.put('/:id', async (req, res) => {
  try {
    const reunion = await Reunion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(reunion);
  } catch (err) {
    res.status(400).send('Error al actualizar la reunión');
  }
});

// Eliminar una reunión
router.delete('/:id', async (req, res) => {
  try {
    await Reunion.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Reunión eliminada' });
  } catch (err) {
    res.status(400).send('Error al eliminar la reunión');
  }
});

module.exports = router;