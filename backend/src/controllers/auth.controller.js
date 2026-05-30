const User = require('../models/User');
const generateTokenAndSetCookie = require('../utils/generateToken');

exports.register = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) return res.status(400).json({ success: false, message: 'All fields are required' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: 'Email already in use' });

    const user = await User.create({ fullName, email, password });
    generateTokenAndSetCookie(res, { id: user._id });
    res.json({ success: true, data: { id: user._id, fullName: user.fullName, email: user.email } });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: 'Invalid email or password' });

    const matched = await user.comparePassword(password);
    if (!matched) return res.status(400).json({ success: false, message: 'Invalid email or password' });

    generateTokenAndSetCookie(res, { id: user._id });
    res.json({ success: true, data: { id: user._id, fullName: user.fullName, email: user.email } });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie('token', { httpOnly: true, sameSite: 'lax' });
    res.json({ success: true, data: null });
  } catch (err) {
    next(err);
  }
};

exports.me = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ success: false, message: 'Not authenticated' });
    res.json({ success: true, data: { id: req.user._id, fullName: req.user.fullName, email: req.user.email } });
  } catch (err) {
    next(err);
  }
};
