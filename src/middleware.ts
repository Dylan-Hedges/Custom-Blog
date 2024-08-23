//Middleware - protects routes - redirects users based on cookies/JWT - middleware needs to be in same level as app folder, Next only allows 1 middleware file per project
import { NextResponse } from "next/server";
//Import cookies hook
import { cookies } from "next/headers";
import verifyJWT from "./app/auth/verifyJWT";

//Middleware - used for route protection
export async function middleware(request: Request) {

  //Gets the URL for the incoming request
  const { pathname } = new URL(request.url);

  //Get "Authorization" JWT from cookies
  const cookie = cookies().get("Authorization");

  //If the request URL is "/login" 
  if(pathname === "/login"){
    if (!cookie) {
      //If successfully decrypted continue to "/login" (redirected on client side)
      return;
    }

    try {
      await verifyJWT(cookie)
      //Return user back to "/" login page
      return NextResponse.redirect(new URL("/", request.url));

    } catch (error) {
      console.log(error);
      //If decryption failed redirect user to home page (Promise returns rejected) 
      return NextResponse.redirect(new URL("/login", request.url));
      
    }
  }

}

//Middleware is run on every request to "/" and "/login"
export const config = {
  matcher: ["/login"]
};
