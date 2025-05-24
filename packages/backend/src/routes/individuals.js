import express from 'express';
import Individual from '../models/Individual.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get all individuals of a specific type for the authenticated user
router.get('/:animalType', verifyToken, async (req, res) => {
  try {
    const individuals = await Individual.find({
      userId: req.user._id,
      animalType: req.params.animalType
    });
    res.json(individuals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific individual
router.get('/:animalType/:name', verifyToken, async (req, res) => {
  try {
    const individual = await Individual.findOne({
      userId: req.user._id,
      animalType: req.params.animalType,
      name: req.params.name
    });
    
    if (!individual) {
      return res.status(404).json({ message: 'Individen hittades inte' });
    }
    
    res.json(individual);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new individual
router.post('/', verifyToken, async (req, res) => {
  try {

    const individual = new Individual({
      name: req.body.name,
      idNumber: req.body.idNumber,
      animalType: req.body.animalType,
      userId: req.user._id
    });

    const savedIndividual = await individual.save();
    
    res.status(201).json(savedIndividual);
  } catch (error) {
    console.error('Error creating individual:', error);
    res.status(400).json({ message: error.message });
  }
});

// Add a note to an individual
router.post('/:animalType/:name/notes', verifyToken, async (req, res) => {
  try {
    const individual = await Individual.findOne({
      userId: req.user._id,
      animalType: req.params.animalType,
      name: req.params.name
    });

    if (!individual) {
      return res.status(404).json({ message: 'Individen hittades inte' });
    }

    individual.notes.push({
      content: req.body.content
    });

    const updatedIndividual = await individual.save();
    res.json(updatedIndividual);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router; 