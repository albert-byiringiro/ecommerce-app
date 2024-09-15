import { ObjectId } from "mongodb"
import { getDB } from "../config/database.js"

const handleError = (res, error) => {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' })
}

export async function getAllItems(req, res) {
    try {
        const db = getDB();
        const items = await db.collection('items').find().toArray();
        res.status(200).json(items);
    } catch (error) {
        handleError(res, error);
    }
}

export async function getItemById(req, res) {
    try {
        const db = getDB()
        const id = new ObjectId(req.params.id);
        const item = await db.collection('items').findOne({ _id: id })

        if (!item) {
            return res.status(404).json({ error: 'Item not found' })
        }

        res.status(200).json(item)
    } catch (error) {
        handleError(res, error)
    }
}

export async function createItem(req, res) {
    try {
        const db = getDB()
        const { name, description, price } = req.body

        if (!name || !description || !price) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newItem = { name, description, price: parseFloat(price) }

        const result = await db.collection('items').insertOne(newItem)

        res.status(201).json({ _id: result.insertedId, ...newItem })
    } catch (error) {
        handleError(res, req)
    }
}

export async function updateItem(req, res) {
    try {
        const db = getDB();
        const id = new ObjectId(req.params.id);
        const { name, description, price } = req.body;

        if (!name || !description || !price) {
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

        const updateItem = await db.collection('items').findOne({ _id: id })

        res.status(200).json(updateItem);

    } catch (error) {
        handleError(res, error)
    }
}