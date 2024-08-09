// models/Meeting.js
const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
  status: { type: String, enum: ['present', 'absent', 'excused'], required: true }
});

const MeetingSchema = new mongoose.Schema({
  committee: { type: mongoose.Schema.Types.ObjectId, ref: 'Committee', required: true },
  date: { type: Date, required: true },
  attendances: [AttendanceSchema],
  comment: String
});

module.exports = mongoose.model('Meeting', MeetingSchema);