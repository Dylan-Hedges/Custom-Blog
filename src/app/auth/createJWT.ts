//Library to encrypt JWT
import * as jose from "jose";

//Function that creates a JWT
const createJWT = async (foundUser) => {
    //Creates jwt token - uses jose - uses random string (stored in environment variable) to encode/decode the JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS256";
    const jwt = await new jose.SignJWT({})
        .setProtectedHeader({ alg })
        //Expiration timer for JWT 
        .setExpirationTime("72h")
        //Set to username 
        .setSubject(foundUser.username.toString())
        .sign(secret);
    return jwt;
}

export default createJWT;