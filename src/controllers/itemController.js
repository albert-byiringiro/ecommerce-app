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