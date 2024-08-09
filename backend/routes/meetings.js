// routes/meetings.js
const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');

router.get('/', meetingController.getAllMeetings);
router.post('/', meetingController.createMeeting);
//router.get('/:id', meetingController.getMeeting);
//router.put('/:id', meetingController.updateMeeting);
//router.delete('/:id', meetingController.deleteMeeting);

module.exports = router;