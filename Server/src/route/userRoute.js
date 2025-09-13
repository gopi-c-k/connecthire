import express from 'express';
import { firebaseAuth, refreshToken, changePassword, signIn } from '../controllers/authController.js';
import verifyMiddleware from '../middleware/userVerify.js'

const router = express.Router();

router.post('/auth/firebase', firebaseAuth);
router.post('/auth/refresh', refreshToken);
router.post('/signin', signIn);

// // @desc    Logout user
// router.post('/logout', logout);

router.put('/change-password', verifyMiddleware, changePassword)

export default router;
