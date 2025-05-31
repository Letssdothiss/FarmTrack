import express from 'express';
import bcrypt from 'bcryptjs';
// eslint-disable-next-line no-unused-vars
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { verifyToken } from '../middleware/auth.js';
import Animal from '../models/Animal.js';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 12
 *                 pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{12,}$"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid input
 *       409:
 *         description: Email already exists
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 seNumber:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ 
        message: 'Användare hittades inte',
        type: 'error'
      });
    }
    res.json({
      email: user.email,
      seNumber: user.seNumber
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Ett fel uppstod vid hämtning av profil. Försök igen senare.',
      type: 'error'
    });
  }
});

/**
 * @swagger
 * /api/auth/delete-account:
 *   post:
 *     summary: Delete user account
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *       401:
 *         description: Unauthorized or invalid password
 */
router.post('/delete-account', verifyToken, async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ 
        message: 'Lösenord krävs för att radera kontot',
        type: 'error'
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ 
        message: 'Användare hittades inte',
        type: 'error'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        message: 'Felaktigt lösenord',
        type: 'error'
      });
    }

    await Animal.deleteMany({ userId: req.user._id });
    await User.findByIdAndDelete(req.user._id);

    res.json({ 
      message: 'Ditt konto har raderats',
      type: 'success'
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Ett fel uppstod vid radering av kontot. Försök igen senare.',
      type: 'error'
    });
  }
});

export default router; 