import express from 'express';
import {
  signUp,
  signIn,
  refreshToken,
  logout,
  changePassword
} from '../controllers/authController.js';
import verifyMiddleware from '../middleware/userVerify.js'

const router = express.Router();

// @desc    Register new user
router.post('/signup', signUp);

// @desc    Login user
router.post('/signin', signIn);

// @desc    Refresh access token
router.post('/refresh', refreshToken);

// @desc    Logout user
router.post('/logout', logout);

router.put('/change-password', verifyMiddleware, changePassword)

export default router;
