import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { verifyToken } from '../middleware/auth.js';
import Animal from '../models/Animal.js';

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validera input
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'E-post och lösenord krävs',
        type: 'error'
      });
    }

    // Validera e-post format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Ogiltig e-postadress',
        type: 'error'
      });
    }

    // Validera lösenord
    if (password.length < 8) {
      return res.status(400).json({ 
        message: 'Lösenordet måste vara minst 8 tecken långt',
        type: 'error'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'En användare med denna e-postadress finns redan',
        type: 'error'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      email,
      password: hashedPassword
    });

    await user.save();

    // Create token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({ 
      message: 'Registrering lyckades! Du kan nu logga in.',
      type: 'success',
      token 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Ett fel uppstod vid registrering. Försök igen senare.',
      type: 'error'
    });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validera input
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'E-post och lösenord krävs',
        type: 'error'
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        message: 'Felaktig e-post eller lösenord',
        type: 'error'
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        message: 'Felaktig e-post eller lösenord',
        type: 'error'
      });
    }

    // Create token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ 
      message: 'Inloggning lyckades!',
      type: 'success',
      token 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Ett fel uppstod vid inloggning. Försök igen senare.',
      type: 'error'
    });
  }
});

// Profile route
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
      seNumber: user.seNumber,
      password: user.password
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Ett fel uppstod vid hämtning av profil. Försök igen senare.',
      type: 'error'
    });
  }
});

// Delete account route
router.post('/delete-account', verifyToken, async (req, res) => {
  try {
    const { password } = req.body;

    // Validera input
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

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        message: 'Felaktigt lösenord',
        type: 'error'
      });
    }

    // Delete all animals associated with the user
    await Animal.deleteMany({ userId: req.user._id });

    // Delete the user
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