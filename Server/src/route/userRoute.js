import express from 'express';
import {
  signUp,
  signIn,
  refreshToken,
  logout,
} from '../controllers/authController.js';

const router = express.Router();

// @desc    Register new user
router.post('/signup', signUp);

// @desc    Login user
router.post('/signin', signIn);

// @desc    Refresh access token
router.post('/refresh', refreshToken);

// @desc    Logout user
router.post('/logout', logout);

export default router;
