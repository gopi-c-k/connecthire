import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const verifyMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken || req.headers['authorization']?.split(' ')[1];
    const refreshToken = req.cookies?.refreshToken;

    if (!accessToken) {
      return res.status(401).json({ message: 'No access token provided' });
    }

    // ✅ Try verifying access token
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err && err.name === 'TokenExpiredError') {
        if (!refreshToken) {
          return res.status(401).json({ message: 'Access token expired. No refresh token available.' });
        }

        try {
          const user = await User.findOne({ refreshToken });
          if (!user) {
            return res.status(403).json({ message: 'Invalid refresh token' });
          }

          jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (refreshErr, refreshDecoded) => {
            if (refreshErr) {
              return res.status(403).json({ message: 'Invalid refresh token' });
            }

            const newAccessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
            const newRefreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

            // Update cookies
            res.cookie('accessToken', newAccessToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'none',
              maxAge: 15 * 60 * 1000,
            });

            res.cookie('refreshToken', newRefreshToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'none',
              maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            user.refreshToken = newRefreshToken;
            if(!user.status){
              return res.status(403).json({ message: 'User account is not active' });
            }
            await user.save();

            req.user = { userId: user._id };
            req.user.msgRole = user.role;
            console.log("Fr"+user.role);
            return next();
          });
        } catch (refreshCatchErr) {
          return res.status(500).json({ message: 'Error refreshing token' });
        }
      } else if (err) {
        return res.status(403).json({ message: 'Invalid access token' });
      } else {
        req.user = { userId: decoded.userId };
        return next();
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error in token verification' });
  }
};

export default verifyMiddleware;
