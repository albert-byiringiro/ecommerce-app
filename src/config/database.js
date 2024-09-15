import { MongoClient } from "mongodb";

let db;

export async function connectToDatabase() {
    try {
        const client = new MongoClient(process.env.MONGODB_URI);

        await client.connect();

        // Get the database instance
        db = client.db();
        console.log('MongoDB connected');

    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

export function getDB() {
    if (!db) {
        throw new Error('Database not initialized. Call connectToDatabase first.');
    }
    return db;
}