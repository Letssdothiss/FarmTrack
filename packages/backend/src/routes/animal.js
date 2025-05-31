import express from 'express';
import Animal from '../models/Animal.js';

const router = express.Router();

/**
 * @swagger
 * /api/animals:
 *   get:
 *     summary: Get all animals for the logged-in user
 *     tags: [Animals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of animals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   type:
 *                     type: string
 *                   age:
 *                     type: number
 *                   userId:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/animals:
 *   post:
 *     summary: Add a new animal
 *     tags: [Animals]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - age
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               age:
 *                 type: number
 *     responses:
 *       201:
 *         description: Animal created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 type:
 *                   type: string
 *                 age:
 *                   type: number
 *                 userId:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/animals/{id}:
 *   put:
 *     summary: Update an animal
 *     tags: [Animals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Animal ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               age:
 *                 type: number
 *     responses:
 *       200:
 *         description: Animal updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 type:
 *                   type: string
 *                 age:
 *                   type: number
 *                 userId:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Animal not found
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/animals/{id}:
 *   delete:
 *     summary: Delete an animal
 *     tags: [Animals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Animal ID
 *     responses:
 *       200:
 *         description: Animal deleted successfully
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
 *         description: Animal not found
 *       500:
 *         description: Server error
 */
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