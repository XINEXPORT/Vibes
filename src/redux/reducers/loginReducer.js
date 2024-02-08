import axios from "axios";



const initialState = {
    loggedIn: null,
    user: null,
    modal: 'none'
};

export default function loginReducer(state = initialState, action){
    switch(action.type){
        case 'loginstatus':
            return {...state, user:action.payload.user,loggedIn: action.payload.loggedIn}
        case 'login':
            return {...state, user: action.payload, loggedIn: true};
        case 'logout':
            return {...state, user:null, loggedIn: false};
        case 'modal-on':
            return {...state, modal:'flex'};
        case 'modal-off':
            console.log('Modal off action dispatched');
            return {...state, modal:'none'};
        default:
            return state;
}};