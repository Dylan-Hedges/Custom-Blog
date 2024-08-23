"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../ReduxStore/store";
//Imports actions 
import {userLoggedIn} from "../ReduxStore/userAuth/userAuthSlice";


export default function Home() {
  
  //Allows component to dispatch actions - (react-redux dispatch hook)
  const dispatch = useDispatch<AppDispatch>();
  
  //Hook for page redirection
  const router = useRouter();

  const [loginMessage, setLoginMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleUsername(event){
    const newUsername = event.target.value;
    const newUsernameLowercase = newUsername.toLowerCase();
    setUsername(newUsernameLowercase);
  }

  function handlePassword(event){
    const newPassword = event.target.value;
    setPassword(newPassword);
  }

  //Form submit event handler 
  async function handleSubmit(event){

      //Prevents page reloading 
      event.preventDefault();

      try{
        //Checks user is valid - Sends a POST request to '/login' API route
        const result = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          //Converts body to JSON for sending to '/login' route - entered username and password passed in(req.body)
          body: JSON.stringify({ username: username, password: password })
        });

        //Saves returned status code
        const statusCode = result.status;

        //Read request body - converts JSON to JS Object
        const returnedResult = await result.json();

        //If request successful
        if(statusCode === 200){
          //Dispatch action - updates Redux store auth state
          dispatch(userLoggedIn())
          //Redirect user to home page
          router.push('/');
        } else {
          //If error with authorization
          const returnedErrorMessage = returnedResult.error;
          console.log(statusCode + ' ' + returnedErrorMessage);
          setLoginMessage(returnedErrorMessage);
        }

      }catch(error){
        //If an error with '/api/login' route
        console.log(error);
        const errorMessage = 'Error with request, please try again later.';
        setLoginMessage(errorMessage);
      }
  }

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Next logo"
            src="/next.svg"
            className="mx-auto h-24 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter username"
                  required
                  onChange={handleUsername}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 p-2.5"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  required
                  onChange={handlePassword}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 p-2.5"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-sky-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700">
                Login
              </button>
            </div>
          </form>
          <p className="text-red-600 pt-3">{loginMessage}</p>
        </div>
      </div>
    </div>
  );
}
