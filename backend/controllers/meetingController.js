// controllers/meetingController.js
const Meeting = require('../models/Meeting');

exports.getAllMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find().populate('committee').populate('attendances.member');
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createMeeting = async (req, res) => {
  const meeting = new Meeting(req.body);
  try {
    const newMeeting = await meeting.save();
    res.status(201).json(newMeeting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
