import './AddFriendModal.css'
import axios from 'axios'
import {  Form } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

const AddFriendModal = ({searchInput, 
                        setSearchInput, 
                        friendReqList, 
                        setFriendReqList, 
                        userId, 
                        username, 
                        friendRequestModalState, 
                        setFriendRequestModalState,
                        userSearch
                    })=> {

console.log(userSearch)
const user = useSelector(state => state.login.user);
const [selectedFriend, setSelectedFriend] = useState(null);
const [friend, setFriend]=useState(null)
const [input, setInput] = useState("");

useEffect(()=>{
    return ()=>{
        const results = userSearch.filter((user)=>{
            
            const {username} = user
            console.log(username)
            return username.includes(input)
        
        })
      
      const searchField = results.map((user)=>{
        console.log(username)
            return(    
            <div className= "friend-choice">
                <p>{user.username}</p>
                <button onClick = {()=>handleFriendRequest(user.userId)}> Add Friend </button>
            </div>
            )
        })
        setFriend(searchField) 
    }
   
},[input])

   
const handleFriendRequest = async (requesteeId) => {
    console.log("hit")

        const {data} = await axios.post(`/api/request`, {
            requesteeId: requesteeId
        });
       
};

    return (
        <div className = "addfriendmodal">

        <input onChange = {(e)=>setInput(e.target.value)}/>
        <div className = "friendchoices">
           {friend}
        </div>
            

        <div className = "friendreq-modalContainer"
        onClick={()=>setFriendRequestModalState(false)}> X 
        </div>
        
            
        </div>
    );
};

export default AddFriendModal;