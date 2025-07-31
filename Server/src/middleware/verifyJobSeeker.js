import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import JobSeeker from '../models/jobSeeker.js';

export const verifyJobSeeker = asyncHandler(async (req, res, next) => {
  const token = req.cookies.accessToken || req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, token missing');
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    if (user.role !== 'jobseeker') {
      res.status(403);
      throw new Error('Access denied: Not a jobseeker account');
    }

    // Find jobseeker profile for this user
    let jobSeeker = await JobSeeker.findOne({ user: user._id });
    if (!jobSeeker) {
        res.status(404);
        throw new Error('JobSeeker profile not found');
    }

    req.user = user;
    req.jobSeeker = jobSeeker;
    next();
  } catch (err) {
    res.status(401);
    throw new Error('Not authorized, invalid token');
  }
});
