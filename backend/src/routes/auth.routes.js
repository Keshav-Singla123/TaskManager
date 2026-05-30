const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 10,
	message: { success: false, message: 'Too many requests, try again later' }
});

router.post('/register', authLimiter, authController.register);
router.post('/login', authLimiter, authController.login);
router.post('/logout', authController.logout);
router.get('/me', authMiddleware, authController.me);

module.exports = router;
