
//Import jose for JWT validation & creation
import * as jose from "jose";

const verifyJWT = async (cookie) => {
    try{
        //Creates secret key - used to decrypt JWT
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);

        //Saves JWT - passed into jwtVerify
        const jwt = cookie.value;

        //Decrypt JWT using jose (asychnronous, if Promise returns Fulfilled it proceeds to the next line)
        await jose.jwtVerify(jwt, secret, {});

    }catch(error){
        console.log(error)
    }

}

export default verifyJWT;