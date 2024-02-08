import axios from "axios";

const getLoginStatus = async() =>{
    const {data}= await axios.get('/api/auth/status');
    return data
}

const initialState = {
    loggedIn: getLoginStatus().loggedIn,
    user: getLoginStatus().user,
    modal: 'none'
};

export default function loginReducer(state = initialState, action){
    switch(action.type){
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