// controllers/committeeController.js
const Committee = require('../models/Committee');

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