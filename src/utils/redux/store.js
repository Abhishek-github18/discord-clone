import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import serverReducer from './slices/serverSlice';
import channelReducer from './slices/channelSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        server: serverReducer,
        channel: channelReducer
    },
    });
    

export default store;
