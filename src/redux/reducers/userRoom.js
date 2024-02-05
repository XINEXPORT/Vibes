import axios from "axios";

const initialState = {
    user: [],
}

const userRoom =(state = initialState, action)=>{
    switch(action.type){
        case 'add-user':
            return{
                ...state, 
                user: [...state.user, action.payload]
    };
    default: 
        return state; 
}};

export default userRoom;

