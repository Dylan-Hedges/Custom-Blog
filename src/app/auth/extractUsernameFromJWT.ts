import { cookies } from "next/headers";
import * as jose from "jose";

const extractUsernameFromJWT = async () =>{
    const cookie = cookies().get("Authorization");
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const jwt = cookie.value;
    const { payload } = await jose.jwtVerify(jwt, secret, {});
    //Extracts username 
    const username = payload.sub;
    return username;
}

export default extractUsernameFromJWT;
