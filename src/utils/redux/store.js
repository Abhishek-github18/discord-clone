import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import serverReducer from './slices/serverSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        server: serverReducer,
    },
    });
    

export default store;
