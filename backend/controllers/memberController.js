// controllers/memberController.js
import Member from '../models/Member.js'

const memberController = {

  getAllMembers: async (req, res) => {
    try {
      const members = await Member.find();
      res.json(members);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  createMember: async (req, res) => {
    const member = new Member(req.body);
    try {
      const newMember = await member.save();
      res.status(201).json(newMember);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  getMember: async (req, res) => {
    try {
      const member = await Member.findById(req.params.id);
      if (!member) {
        return res.status(404).json({ message: 'Member not found' });
      }
      res.json(member);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  updateMember: async (req, res) => {
    try {
      const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!member) {
        return res.status(404).json({ message: 'Member not found' });
      }
      res.json(member);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  deleteMember: async (req, res) => {
    try {
      const member = await Member.findByIdAndDelete(req.params.id);
      if (!member) {
        return res.status(404).json({ message: 'Member not found' });
      }
      res.json({ message: 'Member deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default memberController