// controllers/committeeController.js
import Group from '../models/Group.js'
import Member from '../models/Member.js'

const groupController = {

getAllGroups: async (req, res) => {
  try {
    const groups = await Group.find().populate('members.member');
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
},

createGroup: async (req, res) => {
  const group = new Group(req.body);
  try {
    const newGroup = await group.save();
    res.status(201).json(newGroup);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
},
getGroup: async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ message: 'Grupo no encontrado' });
    }
    res.json(committee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
},

updateGroup: async (req, res) => {
  try {
    const group = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!group) {
      return res.status(404).json({ message: 'Grupo no encontrado' });
    }
    res.json(committee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
},
deleteGroup: async (req, res) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.id);
    if (!group) {
      return res.status(404).json({ message: 'Grupo no encontrado' });
    }
    res.json({ message: 'Grupo eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
},

addMemberToGroup: async (req, res) => {
  try {
    const { groupId, memberId, role, startDate } = req.body;

    // Verificar si el comité existe
    const group = await Group.findById(committeeId);
    if (!group) {
      return res.status(404).json({ message: 'Grupo no encontrado' });
    }

    // Verificar si el miembro existe
    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({ message: 'Miembro no encontrado' });
    }

    // Verificar si el miembro ya está en el comité
    const existingMember = group.members.find(m => m.member.toString() === memberId);
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
    res.status(500).json({ message: 'Error al añadir miembro al grupo', error: error.message });
  }
},

getAllMembers: async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ message: 'Grupo no encontrado' });
    }
    res.json(group.members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
}

export default groupController