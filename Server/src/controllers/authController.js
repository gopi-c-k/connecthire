import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

// Helper to generate tokens and set cookies
const generateTokens = (res, userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'development',
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

  if(user.role != role){
    return res.status(400).json({ message: "Invalid User Role"})
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

// @desc    Logout user
// @route   POST /user/auth/logout
// @access  Public
export const logout = asyncHandler(async (req, res) => {
  const tokenFromCookie = req.cookies.refreshToken;

  if (tokenFromCookie) {
    const user = await User.findOne({ refreshToken: tokenFromCookie });
    if (user) {
      user.refreshToken = null;
      user.online = false;
      user.lastSeen = new Date();
      await user.save();
    }
  }

  res.clearCookie('accessToken', { httpOnly: true, sameSite: 'none', secure: process.env.NODE_ENV === 'production' });
  res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: process.env.NODE_ENV === 'production' });

  res.status(200).json({ message: 'Logged out successfully' });
});

// @desc    Register a new user
// @route   POST /api/users/signup
// @access  Public
export const signUp = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: "User already exists"});
    // throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "jobseeker",
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      message: "User registered successfully",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
