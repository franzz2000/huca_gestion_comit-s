// routes/committees.js
import express from 'express'
import groupController from '../controllers/groupController.js'

const router = express.Router();

router.get('/', groupController.getAllGroups);
router.post('/', groupController.createGroup);
router.get('/:id', groupController.getGroup);
router.put('/:id', groupController.updateGroup);
router.delete('/:id', groupController.deleteGroup);
router.post('/member', groupController.addMemberToGroup);
router.get('/members/:id', groupController.getAllMembers);

export default router