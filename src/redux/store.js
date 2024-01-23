import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './reducers/loginReducer.js';
import editorReducer from './reducers/editorReducer.js';

const store =  configureStore({
    reducer: {
        login: loginReducer,
        editor: editorReducer
    }
});

export default store;