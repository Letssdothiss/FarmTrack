import express from 'express';
import { register, login } from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', login);

/**
 * @route   GET /api/auth/profile
 * @desc    Get user profile
 * @access  Private
 */
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Användare hittades inte' });
    }
    res.json(user);
  } catch (error) {
    // Keeping some console statements for convenience.
    // eslint-disable-next-line no-console
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
