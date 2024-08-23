//Provides access to cookies
import { cookies } from "next/headers";

//Function that sets the JWT in cookies
const setCookie = async (jwt) =>{
    //Sets a JWT in cookies with a name of "Authorization"
    cookies().set("Authorization", jwt, {
         //Only used on HTTPS and local
        secure: true,
        //Only HTTP can access
        httpOnly: true,
        //Expires cookie (3 days)
        expires: Date.now() + 24 * 60 * 60 * 1000 * 3,
        //Works everywhere
        path: "/",
        //Only used in one domain 
        sameSite: "strict",
    });
    return;
}

export default setCookie;