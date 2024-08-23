import { connectToDatabase } from '../lib/mongoDBConnection';

//Function that gets the users collection from the database
const getUsersCollectionFromDB = async () =>{
    //Connects to MongoDB - asynchronous connection 
    const client = await connectToDatabase();
    //Gets the database
    const db = client.db();
    //Saves the 'users' collection
    const usersCollection = db.collection("users");
    return usersCollection;
}
export default getUsersCollectionFromDB;
    