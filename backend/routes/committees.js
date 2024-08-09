// routes/committees.js
const express = require('express');
const router = express.Router();
const committeeController = require('../controllers/committeeController');

router.get('/', committeeController.getAllCommittees);
router.post('/', committeeController.createCommittee);
router.get('/:id', committeeController.getCommittee);
router.put('/:id', committeeController.updateCommittee);
router.delete('/:id', committeeController.deleteCommittee);
router.post('/member', committeeController.addMemberToCommittee);
router.get('/members/:id', committeeController.getAllMembers);

module.exports = router;