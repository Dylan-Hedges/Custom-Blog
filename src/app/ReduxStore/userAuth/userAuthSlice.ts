'use client';
//Slice (Redux toolkit) - Define state, action creators & reducers here (reduces manual setup)
import { createSlice } from "@reduxjs/toolkit";

//Defines what state looks like for this slice
interface InterfaceInitialState {
  userLoggedIn: boolean;
}

//Sets initial state
const initialState: InterfaceInitialState = {
  userLoggedIn: false
};

//Creates a slice (each slice has its own state)
const userAuthSlice = createSlice({
  //name: is prefixed to Action Type 
  name: "userAuth",
  initialState,
  reducers: {
    userLoggedIn: (state) => {
      //Note - this is not mutating state directly - redux toolkit makes copy and mutates it 
      state.userLoggedIn = true;
    },
    userLoggedOut: (state) => {
      state.userLoggedIn = false;
    }
  },
});

//Exports actions - used in components (redux toolkit automatically creates & names actions based on the reducer)
export const { userLoggedIn, userLoggedOut } = userAuthSlice.actions;

//Exports reducer (uses redux toolkit) - used in store.ts
export default userAuthSlice.reducer;
