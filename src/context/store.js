import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import groupReducer from './groupSlice';

export default configureStore({
    reducer:{
        user: userReducer,
        group: groupReducer,
    },
});
