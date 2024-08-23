'use client';

import { configureStore } from '@reduxjs/toolkit';
import userAuthSlice from './userAuth/userAuthSlice';

export const store = configureStore({
    reducer: {
        //State is accessed in components with key 'userAuth'
        userAuth: userAuthSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;