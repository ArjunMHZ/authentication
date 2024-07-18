import express from 'express';
import { signup, login, verify, logout, refreshToken } from '../controllers/authController';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/verify', verify);
router.post('/refreshToken', refreshToken);
router.post('/logout', logout);

export default router;