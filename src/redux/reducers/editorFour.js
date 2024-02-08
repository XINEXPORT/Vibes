import axios from "axios";

const getSounds = async ()=>{
    const { data: { favs } } = await axios.get('/api/sounds');
    return favs
}

const initialState = {
    mySounds: getSounds()
};

export default function editorOne(state = initialState, action) {
    switch (action.type) {
        case 'login-get':
            console.log(action.payload);
            return {...state, mySounds: action.payload};
        case 'delete':
            return {...state, mySounds: action.payload};
        case 'create':
            return {...state, mySounds: action.payload};
        default:
            return state;
    };
};