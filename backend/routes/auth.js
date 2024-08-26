import express from 'express'
import authController from '../controllers/authController.js'

const router = express.Router();

router.post('/user', authController.createUser);
router.post('/login', authController.login);
router.get('/', authController.checkAuth);
router.post('/logout', authController.logout);

//router.get('/protected', authController.protected);

export default router