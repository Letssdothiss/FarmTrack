import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import Note from '../models/Note.js';

const router = express.Router();

/**
 * @swagger
 * /api/notes/species/{species}:
 *   get:
 *     summary: Get all notes for a specific species
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: species
 *         required: true
 *         schema:
 *           type: string
 *         description: Species name (e.g., 'cow', 'sheep')
 *     responses:
 *       200:
 *         description: List of notes for the species
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *                   species:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/notes/individual/{individualId}:
 *   get:
 *     summary: Get all notes for a specific individual
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: individualId
 *         required: true
 *         schema:
 *           type: string
 *         description: Individual ID
 *     responses:
 *       200:
 *         description: List of notes for the individual
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *                   individualId:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               species:
 *                 type: string
 *               individualId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Note created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 species:
 *                   type: string
 *                 individualId:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Bad request - Missing required fields
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Update a note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Note ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 species:
 *                   type: string
 *                 individualId:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Note not found
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Delete a note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Note ID
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Note not found
 *       500:
 *         description: Server error
 */
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