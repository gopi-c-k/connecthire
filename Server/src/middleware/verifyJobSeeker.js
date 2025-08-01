import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import JobSeeker from '../models/jobSeeker.js';

export const verifyJobSeeker = asyncHandler(async (req, res, next) => {
  const token = req.cookies.accessToken || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }

  try {
    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== 'jobseeker') {
      return res.status(403).json({ message: 'Access denied: Not a jobseeker account' });
    }

    // ✅ Check if JobSeeker profile exists
    let jobSeeker = await JobSeeker.findOne({ user: user._id });

    if (!jobSeeker) {
      jobSeeker = await JobSeeker.create({
        user: user._id,
        fullName: user.name || '', 
        contact: { email: user.email }
      });
    }

    req.jobSeeker = jobSeeker;
    next();

  } catch (err) {
    console.error('JWT Verify Error:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
});
