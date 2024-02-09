import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './reducers/loginReducer.js';
import editorOne from './reducers/editorOne.js';


const store =  configureStore({
    reducer: {
        login: loginReducer,
        
        favorites: editorOne,
    }
});

export default store;