const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const cookieToken = req.cookies && req.cookies.token;
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : null;
    const token = cookieToken || bearerToken;
    if (!token) return res.status(401).json({ success: false, message: 'Not authenticated' });

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET not set');

    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ success: false, message: 'Invalid token' });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }
};

module.exports = authMiddleware;
