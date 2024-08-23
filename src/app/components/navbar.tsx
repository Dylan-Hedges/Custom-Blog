"use client";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../ReduxStore/store";
//Imports userLoggedOut action
import { userLoggedOut } from "../ReduxStore/userAuth/userAuthSlice";

export default function Navbar(){
    //Redirect user hook (client side) 
    const router = useRouter();

    //Saves user logged in state (TRUE/FALSE, stored in Redux Store)
    const userLoggedIn = useSelector((state: RootState) => state.userAuth.userLoggedIn);

    //Allows component to dispatch actipns
    const dispatch = useDispatch<AppDispatch>();

    function loginHandler(){
      router.push('/login');
    }

    //On clicking Logout button - sends a POST request to the logout API route - route deletes cookies/JWT
    async function logOutHandler(){
      try{
        const result = await fetch('/api/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        //Save returned status code
        const statusCode = result.status;

        //Read request body - converts JSON to JS Object
        const returnedResult = await result.json();

        if(statusCode === 500){
          console.log(returnedResult)
        }

        dispatch(userLoggedOut())
        //Redirects user back to home/login page
        router.push('/');
        
      }catch(error){
        //Display error if 'api/logout' fails 
        console.log(error); 
      }
    }

    return(
      <header>
        <nav className="bg-white p-3">
            <div className="container mx-auto flex justify-between items-center">
                {/*Logo*/}
                <div className="text-white text-lg font-semibold" >
                    <img
                        alt="Next Logo"
                        src="/next.svg"
                        className="mx-auto h-6 w-auto"
                    />
                </div>
                {/* Navbar Buttons */}
                <ul className="flex space-x-3">
                  {userLoggedIn ? (
                    <li>
                      <button
                        className="bg-sky-700 text-white py-2 px-4 rounded-lg shadow hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-red-300"
                        onClick={logOutHandler} 
                      >
                      Logout
                      </button>
                    </li>
                  ) : (
                    <li>
                      <button
                        className="bg-sky-700 text-white py-2 px-4 rounded-lg shadow hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-red-300"
                        onClick={loginHandler} 
                      >
                      Login
                      </button>
                    </li>
                  )}
                </ul>
            </div>
        </nav>
      </header>
    )
}