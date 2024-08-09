// controllers/committeeController.js
const Committee = require('../models/Committee');
const Member = require('../models/Member');

exports.getAllCommittees = async (req, res) => {
  try {
    const committees = await Committee.find().populate('members.member');
    res.json(committees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCommittee = async (req, res) => {
  const committee = new Committee(req.body);
  try {
    const newCommittee = await committee.save();
    res.status(201).json(newCommittee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getCommittee = async (req, res) => {
  try {
    const committee = await Committee.findById(req.params.id);
    if (!committee) {
      return res.status(404).json({ message: 'Committee no encontrado' });
    }
    res.json(committee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCommittee = async (req, res) => {
  try {
    const committee = await Committee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!committee) {
      return res.status(404).json({ message: 'Committee no encontrado' });
    }
    res.json(committee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCommittee = async (req, res) => {
  try {
    const commitee = await Committee.findByIdAndDelete(req.params.id);
    if (!committee) {
      return res.status(404).json({ message: 'Committee no encontrado' });
    }
    res.json({ message: 'Committee eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addMemberToCommittee = async (req, res) => {
  try {
    const { committeeId, memberId, role, startDate } = req.body;

    // Verificar si el comité existe
    const committee = await Committee.findById(committeeId);
    if (!committee) {
      return res.status(404).json({ message: 'Comité no encontrado' });
    }

    // Verificar si el miembro existe
    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({ message: 'Miembro no encontrado' });
    }

    // Verificar si el miembro ya está en el comité
    const existingMember = committee.members.find(m => m.member.toString() === memberId);
    if (existingMember) {
      return res.status(400).json({ message: 'El miembro ya está en este comité' });
    }

    // Añadir el miembro al comité
    committee.members.push({
      member: memberId,
      role,
      startDate: new Date(startDate),
    });

    await committee.save();

    res.status(200).json({ message: 'Miembro añadido al comité con éxito', committee });
  } catch (error) {
    res.status(500).json({ message: 'Error al añadir miembro al comité', error: error.message });
  }
};

exports.getAllMembers = async (req, res) => {
  try {
    const committee = await Committee.findById(req.params.id);
    if (!committee) {
      return res.status(404).json({ message: 'Committee no encontrado' });
    }
    res.json(committee.members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}