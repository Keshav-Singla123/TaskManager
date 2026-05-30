const jwt = require('jsonwebtoken');

const generateTokenAndSetCookie = (res, payload) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  if (!secret) throw new Error('JWT_SECRET not set');

  const token = jwt.sign(payload, secret, { expiresIn });

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  };

  res.cookie('token', token, cookieOptions);
  return token;
};

module.exports = generateTokenAndSetCookie;
