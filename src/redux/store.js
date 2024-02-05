import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './reducers/loginReducer.js';
import editorOne from './reducers/editorOne.js';
import editorTwo from './reducers/editorTwo.js';
import editorThree from './reducers/editorThree.js';
import editorFour from './reducers/editorFour.js';

const store =  configureStore({
    reducer: {
        login: loginReducer,
        editorOne: editorOne,
        editorTwo: editorTwo,
        editorThree: editorThree,
        editorFour: editorFour,
    }
});

export default store;