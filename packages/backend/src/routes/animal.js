import express from 'express';
import Animal from '../models/Animal.js';

const router = express.Router();

// Get all animals for the logged-in user
router.get('/', async (req, res) => {
  try {
    const animals = await Animal.find({ userId: req.user.userId });
    res.json(animals);
  } catch (error) {
    // Keeping some console statements for convenience.
    // eslint-disable-next-line no-console
    console.error('Error fetching animals:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new animal
router.post('/', async (req, res) => {
  try {
    const { name, type, age } = req.body;
    const animal = new Animal({
      name,
      type,
      age,
      userId: req.user.userId
    });
    await animal.save();
    res.status(201).json(animal);
  } catch (error) {
    // Keeping some console statements for convenience.
    // eslint-disable-next-line no-console
    console.error('Error adding animal:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update an animal
router.put('/:id', async (req, res) => {
  try {
    const { name, type, age } = req.body;
    const animal = await Animal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { name, type, age },
      { new: true }
    );
    if (!animal) {
      return res.status(404).json({ message: 'Djur hittades inte' });
    }
    res.json(animal);
  } catch (error) {
    // Keeping some console statements for convenience.
    // eslint-disable-next-line no-console
    console.error('Error updating animal:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete an animal
router.delete('/:id', async (req, res) => {
  try {
    const animal = await Animal.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });
    if (!animal) {
      return res.status(404).json({ message: 'Djur hittades inte' });
    }
    res.json({ message: 'Djur borttaget' });
  } catch (error) {
    // Keeping some console statements for convenience.
    // eslint-disable-next-line no-console
    console.error('Error deleting animal:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 