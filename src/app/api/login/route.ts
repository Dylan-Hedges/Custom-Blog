import { NextResponse } from 'next/server'
import getUsersCollectionFromDB from '../../lib/getUsersCollectionFromDB';
import createJWT from '../../auth/createJWT';
import setCookie from '../../auth/setCookie';


//Login POST request route handler 
export async function POST(request: Request){

    //Provides access to req.body (Next.js specific when using Next API routes)
    const body = await request.json();

    //Destructures username and password from request body - the values entered by user
    const {username, password} = body;

    //Saves the user collection
    const usersCollection = await getUsersCollectionFromDB();

    //Searches for user in 'users' collection - checks username and password match 
    const foundUser = await usersCollection.findOne({username: username, password: password});

    //If a user is found
    if(foundUser && foundUser !== null){
        try{
            //Creates JWT
            const jwt = await createJWT(foundUser);

            //Sets JWT in cookies
            await setCookie(jwt);
                        
            //Return successful response
            return NextResponse.json({message: 'Successfully signed in.' }, { status: 200 });

        }catch(error){
            console.log(error);
            return NextResponse.json({ error: 'Error with request, please try again later.' }, { status: 500 });
        }
    }else{
        //Return unsuccessful response
        return NextResponse.json({ error: 'Enter a valid username and password.' }, { status: 401 });
    }
}

