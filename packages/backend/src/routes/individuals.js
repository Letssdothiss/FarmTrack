import express from 'express';
import Individual from '../models/Individual.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * /api/individuals/{animalType}:
 *   get:
 *     summary: Get all individuals of a specific type
 *     tags: [Individuals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: animalType
 *         required: true
 *         schema:
 *           type: string
 *         description: Type of animal (e.g., 'cow', 'sheep')
 *     responses:
 *       200:
 *         description: List of individuals
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
 *                   idNumber:
 *                     type: string
 *                   animalType:
 *                     type: string
 *                   notes:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         content:
 *                           type: string
 *                         date:
 *                           type: string
 *                           format: date-time
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/individuals/{animalType}/{name}:
 *   get:
 *     summary: Get a specific individual by name
 *     tags: [Individuals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: animalType
 *         required: true
 *         schema:
 *           type: string
 *         description: Type of animal
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the individual
 *     responses:
 *       200:
 *         description: Individual details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 idNumber:
 *                   type: string
 *                 animalType:
 *                   type: string
 *                 notes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       content:
 *                         type: string
 *                       date:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Individual not found
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/individuals:
 *   post:
 *     summary: Create a new individual
 *     tags: [Individuals]
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
 *               - idNumber
 *               - animalType
 *             properties:
 *               name:
 *                 type: string
 *               idNumber:
 *                 type: string
 *               animalType:
 *                 type: string
 *     responses:
 *       201:
 *         description: Individual created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 idNumber:
 *                   type: string
 *                 animalType:
 *                   type: string
 *                 notes:
 *                   type: array
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
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
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/individuals/{animalType}/{name}/notes:
 *   post:
 *     summary: Add a note to an individual
 *     tags: [Individuals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: animalType
 *         required: true
 *         schema:
 *           type: string
 *         description: Type of animal
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the individual
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 notes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       content:
 *                         type: string
 *                       date:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Individual not found
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/individuals/{animalType}/{id}:
 *   put:
 *     summary: Update an individual
 *     tags: [Individuals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: animalType
 *         required: true
 *         schema:
 *           type: string
 *         description: Type of animal
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Individual ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               idNumber:
 *                 type: string
 *               animalType:
 *                 type: string
 *     responses:
 *       200:
 *         description: Individual updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 idNumber:
 *                   type: string
 *                 animalType:
 *                   type: string
 *                 notes:
 *                   type: array
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Individual not found
 *       500:
 *         description: Server error
 */
router.put('/:animalType/:id', verifyToken, async (req, res) => {
  try {
    const individual = await Individual.findOneAndUpdate(
      { 
        _id: req.params.id,
        userId: req.user._id,
        animalType: req.params.animalType
      },
      req.body,
      { new: true }
    );

    if (!individual) {
      return res.status(404).json({ message: 'Individen hittades inte' });
    }

    res.json(individual);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/individuals/{animalType}/{id}:
 *   delete:
 *     summary: Delete an individual
 *     tags: [Individuals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: animalType
 *         required: true
 *         schema:
 *           type: string
 *         description: Type of animal
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Individual ID
 *     responses:
 *       200:
 *         description: Individual deleted successfully
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
 *         description: Individual not found
 *       500:
 *         description: Server error
 */
router.delete('/:animalType/:id', verifyToken, async (req, res) => {
  try {
    const individual = await Individual.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
      animalType: req.params.animalType
    });

    if (!individual) {
      return res.status(404).json({ message: 'Individen hittades inte' });
    }

    res.json({ message: 'Individen har tagits bort' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 