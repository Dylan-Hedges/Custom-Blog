import { MongoClient } from 'mongodb';

//Connects to remote Mongo database
export async function connectToDatabase() {
    //Saves Mongo string in environment variable 
    const mongoDBString = process.env.MONGODB_CONNECTION_STRING

    //Connects to the Mongo database
    const client = await MongoClient.connect(
        mongoDBString
    );
    
    return client;
}
