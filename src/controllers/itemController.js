import { ObjectId } from 'mongodb';
import { getDb } from '../config/database.js';

// Helper function to handle errors
const handleError = (res, error) => {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
};

// GET /items - Get all items
export async function getAllItems(req, res) {
    try {
        const db = getDb();
        const items = await db.collection('items').find().toArray();
        res.status(200).json(items);
    } catch (error) {
        handleError(res, error);
    }
}

// GET /items/:id - Get a specific item by ID
export async function getItemById(req, res) {
    try {
        const db = getDb();
        const id = new ObjectId(req.params.id);
        const item = await db.collection('items').findOne({ _id: id });

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.status(200).json(item);
    } catch (error) {
        handleError(res, error);
    }
}

// POST /items - Create a new item
export async function createItem(req, res) {
    try {
        const db = getDb();
        const { name, description, price } = req.body;

        // Basic validation
        if (!name || !description || !price) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newItem = { name, description, price: parseFloat(price) };
        const result = await db.collection('items').insertOne(newItem);

        res.status(201).json({ _id: result.insertedId, ...newItem });
    } catch (error) {
        handleError(res, error);
    }
}

// PUT /items/:id - Update an existing item
export async function updateItem(req, res) {
    try {
        const db = getDb();
        const id = new ObjectId(req.params.id);
        const { name, description, price } = req.body;

        // Basic validation
        if (!name && !description && !price) {
            return res.status(400).json({ error: 'No fields to update' });
        }

        const updateData = {};
        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (price) updateData.price = parseFloat(price);

        const result = await db.collection('items').updateOne(
            { _id: id },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }

        const updatedItem = await db.collection('items').findOne({ _id: id });
        res.status(200).json(updatedItem);
    } catch (error) {
        handleError(res, error);
    }
}

// DELETE /items/:id - Delete an item
export async function deleteItem(req, res) {
    try {
        const db = getDb();
        const id = new ObjectId(req.params.id);

        const result = await db.collection('items').deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.status(204).send();
    } catch (error) {
        handleError(res, error);
    }
}