const mongoose = require('mongoose');

const CommitteeMemberSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
  startDate: { type: Date, required: true },
  endDate: Date,
  role: { type: String, required: true },
  comment: String
});

const CommitteeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  tipo1: { type: String },
  tipo2: { type: String },
  constitutionDate: { type: Date, required: true },
  endDate: Date,
  members: [CommitteeMemberSchema]
});

module.exports = mongoose.model('Committee', CommitteeSchema);