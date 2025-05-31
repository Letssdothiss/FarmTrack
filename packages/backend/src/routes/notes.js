import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import Note from '../models/Note.js';

const router = express.Router();

// Hämta alla anteckningar för en art
router.get('/species/:species', verifyToken, async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.user._id,
      species: req.params.species
    }).sort({ createdAt: -1 });
    
    res.json(notes);
  } catch (error) {
    // Keeping some console statements for convenience.
    // eslint-disable-next-line no-console
    console.error('Error fetching species notes:', error);
    res.status(500).json({ message: 'Ett fel uppstod vid hämtning av anteckningar' });
  }
});

// Hämta alla anteckningar för en individ
router.get('/individual/:individualId', verifyToken, async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.user._id,
      individualId: req.params.individualId
    }).sort({ createdAt: -1 });
    
    res.json(notes);
  } catch (error) {
    // Keeping some console statements for convenience.
    // eslint-disable-next-line no-console
    console.error('Error fetching individual notes:', error);
    res.status(500).json({ message: 'Ett fel uppstod vid hämtning av anteckningar' });
  }
});

// Skapa en ny anteckning
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, content, species, individualId } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Titel och innehåll krävs' });
    }

    if (!species && !individualId) {
      return res.status(400).json({ message: 'Antingen art eller individ måste anges' });
    }

    const note = new Note({
      title,
      content,
      species,
      individualId,
      userId: req.user._id
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
    // Keeping some console statements for convenience.
    // eslint-disable-next-line no-console
    console.error('Error creating note:', error);
    res.status(500).json({ message: 'Ett fel uppstod vid skapande av anteckning' });
  }
});

// Uppdatera en anteckning
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { title, content },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: 'Anteckning hittades inte' });
    }

    res.json(note);
  } catch (error) {
    // Keeping some console statements for convenience.
    // eslint-disable-next-line no-console
    console.error('Error updating note:', error);
    res.status(500).json({ message: 'Ett fel uppstod vid uppdatering av anteckning' });
  }
});

// Ta bort en anteckning
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!note) {
      return res.status(404).json({ message: 'Anteckning hittades inte' });
    }

    res.json({ message: 'Anteckning borttagen' });
  } catch (error) {
    // Keeping some console statements for convenience.
    // eslint-disable-next-line no-console
    console.error('Error deleting note:', error);
    res.status(500).json({ message: 'Ett fel uppstod vid borttagning av anteckning' });
  }
});

export default router; 