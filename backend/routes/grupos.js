// routes/grupos.js
const express = require('express');
const router = express.Router();
const Grupo = require('../models/Grupo');

// Obtener todos los grupos
router.get('/', async (req, res) => {
  try {
    const grupos = await Grupo.find();
    res.json(grupos);
  } catch (err) {
    res.status(500).send('Error del servidor');
  }
});

// Crear un nuevo grupo
router.post('/', async (req, res) => {
  try {
    const nuevoGrupo = new Grupo(req.body);
    await nuevoGrupo.save();
    res.status(201).json(nuevoGrupo);
  } catch (err) {
    res.status(400).send('Error al crear el grupo');
  }
});

// Actualizar un grupo
router.put('/:id', async (req, res) => {
  try {
    const grupo = await Grupo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(grupo);
  } catch (err) {
    res.status(400).send('Error al actualizar el grupo');
  }
});

// Eliminar un grupo
router.delete('/:id', async (req, res) => {
  try {
    await Grupo.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Grupo eliminado' });
  } catch (err) {
    res.status(400).send('Error al eliminar el grupo');
  }
});

module.exports = router;