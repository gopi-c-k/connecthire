import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import admin from '../../firebase.js';

dotenv.config();


dotenv.config();

// Helper to generate tokens and set cookies
const generateTokens = (res, userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: 15 * 60 * 1000,
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return { accessToken, refreshToken };
};

// @desc    Sign in or register via Firebase ID token
// @route   POST /user/auth/firebase
// @access  Public
export const firebaseAuth = asyncHandler(async (req, res) => {
  const { idToken, role , username } = req.body;


  if (!idToken) {
    res.status(400);
    throw new Error('Firebase ID token required');
  }

  // Verify ID token
  const decoded = await admin.auth().verifyIdToken(idToken);
  const { uid, email, name, picture } = decoded;
  const signInProvider = decoded.firebase?.sign_in_provider;

  let provider = 'password';
  if (signInProvider === 'google.com') provider = 'google';
  else if (signInProvider === 'phone') provider = 'phone';



  // Find or create user
  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name: username || name || 'User',
      email,
      provider,
      password: null, // no password
      role: role,
      active: true,
    });
  }

  if(user.role != role){
    return res.status(400).json({ message: 'Invalid User Role' });
  }

  if (!user.active) {
    return res.status(403).json({ message: 'User account is deactivated. Please contact support.' });
  }

  // Issue your own JWTs
  const { accessToken, refreshToken } = generateTokens(res, user._id);
  user.refreshToken = refreshToken;
  await user.save();

  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    message: 'Login successful',
    accessToken,
  });
});


// @desc    Refresh access token
// @route   POST /user/auth/refresh
// @access  Public
export const refreshToken = asyncHandler(async (req, res) => {
  const tokenFromCookie = req.cookies.refreshToken;
  if (!tokenFromCookie) {
    res.status(401);
    throw new Error('No refresh token provided');
  }

  const user = await User.findOne({ refreshToken: tokenFromCookie });
  if (!user) {
    res.status(403);
    throw new Error('Invalid refresh token');
  }

  try {
    jwt.verify(tokenFromCookie, process.env.REFRESH_TOKEN_SECRET);

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(res, user._id);

    user.refreshToken = newRefreshToken;
    await user.save();

    res.status(200).json({
      name: user.name,
      email: user.email,
      userId: user.userId,
      profilePicture: user.profilePicture?.data
        ? `data:${user.profilePicture.contentType};base64,${user.profilePicture.data.toString('base64')}`
        : null,
      message: 'Access token refreshed',
      accessToken,
    });
  } catch (err) {
    res.status(403);
    throw new Error('Error verifying refresh token');
  }
});



// @desc    Change password for logged-in user
// @route   PUT /user/auth/change-password
// @access  Private
export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    res.status(400);
    throw new Error('Old and new password are required');
  }

  // Find the logged-in user (assumes req.user is set by auth middleware)
  const user = await User.findById(req.user.userId);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Check old password
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    res.status(401);
    throw new Error('Old password is incorrect');
  }

  // Hash and set new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;

  // Optionally invalidate refresh token for security
  user.refreshToken = null;

  await user.save();

  // Clear old cookies
  res.clearCookie('accessToken', { httpOnly: true, sameSite: 'none', secure: process.env.NODE_ENV === 'production' });
  res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: process.env.NODE_ENV === 'production' });

  res.status(200).json({ message: 'Password changed successfully. Please login again.' });
});

// @desc    Login user
// @route   POST user/auth/signin
// @access  Public
export const signIn = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    res.status(400);
    throw new Error('Email, role and password are required');
  }
  let user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User does not exist" })
  }

  if(!user.active){
    return res.status(403).json({ message: "User account is deactivated. Please contact support." })
  }

  if (user.role != role) {
    return res.status(400).json({ message: "Invalid User Role" })
  }

  if (user && await bcrypt.compare(password, user.password)) {
    const { accessToken, refreshToken } = generateTokens(res, user._id);


    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
      name: user.name,
      email: user.email,
      role: user.role,
      id: user._id,
      message: 'Login successful',
      accessToken,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});