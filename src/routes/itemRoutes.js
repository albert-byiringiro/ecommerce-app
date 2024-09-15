import express from 'express';
import * as itemController from '../controllers/itemController.js';

const router = express.Router();

// GET /items - Get all items
router.get('/', itemController.getAllItems);

// GET /items/:id - Get a specific item by ID
router.get('/:id', itemController.getItemById);

// POST /items - Create a new item
router.post('/', itemController.createItem);

// PUT /items/:id - Update an existing item
router.put('/:id', itemController.updateItem);

// DELETE /items/:id - Delete an item
router.delete('/:id', itemController.deleteItem);

export default router;