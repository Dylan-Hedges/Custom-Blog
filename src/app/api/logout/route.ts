import { NextResponse } from 'next/server'
import { cookies } from "next/headers";

export async function POST(){
    try{
        const AUTHORIZATION = 'Authorization';

        const authorization = cookies().get(AUTHORIZATION);

        if(!authorization){
            throw new Error('Error deleting Authorization cookie')
        }

        //Deletes authorization cookie (JWT) on client side
        cookies().delete(AUTHORIZATION)

        return NextResponse.json({ message: 'Successfully logged out.' }, { status: 200 })
    }catch(error){
        return NextResponse.json({error: error.message}, { status: 500 });
    }
    
}

