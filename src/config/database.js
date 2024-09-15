import { MongoClient } from 'mongodb';

let db;

export async function connectToDatabase() {
    try {
        // Create a new MongoClient
        const client = new MongoClient(process.env.MONGODB_URI);

        // Connect to the MongoDB server
        await client.connect();

        // Get the database instance
        db = client.db();

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

export function getDb() {
    if (!db) {
        throw new Error('Database not initialized. Call connectToDatabase first.');
    }
    return db;
}