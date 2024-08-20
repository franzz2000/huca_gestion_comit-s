// routes/meetings.js
import express from 'express'
import meetingController from '../controllers/meetingController.js'

const router = express.Router()

router.get('/', meetingController.getAllMeetings)
router.post('/', meetingController.createMeeting)
//router.get('/:id', meetingController.getMeeting);
//router.put('/:id', meetingController.updateMeeting);
//router.delete('/:id', meetingController.deleteMeeting);

export default router