import axios from "axios";

const { data }= await axios.get('/api/auth/status');

const initialState = {
    modal: 'none'
};

export default function editorReducer(state = initialState, action) {
    switch (action.type) {
        case 1:
            return {...state}
        default:
            return state;
    };
};