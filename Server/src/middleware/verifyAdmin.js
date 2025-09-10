import asyncHandler from 'express-async-handler';
import User from '../models/user.js';

export const verifyAdmin = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.userId);
    if (!user) {
        return res.status(404).json({ message: "Bad request: Invalid user" });
    }

    if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: Not a company account' });
    }
    req.adminId = user._id;
    next();
});
