import asyncHandler from 'express-async-handler';
import User from '../models/user.js';
import Company from '../models/company.js';

export const verifyCompany = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.userId);
    if (!user) {
        return res.status(404).json({ message: "Bad request: Invalid user" });
    }

    if (user.role !== 'company') {
        return res.status(403).json({ message: 'Access denied: Not a company account' });
    }

    let company = await Company.findOne({ user: user._id });

    if (!company) {
        company = await Company.create({
            user: user._id,
            companyName: user.name || "",
        });
    }

    req.company = company;
    req.companyId = company._id;
    next();
});
