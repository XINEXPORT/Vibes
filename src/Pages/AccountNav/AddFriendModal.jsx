import './AddFriendModal.css'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

const AddFriendModal = ({             
                        username,
                        userSearch,
                        friendRequestModalState,
                        setFriendRequestModalState
                    })=> {
const [users, setUsers]=useState(userSearch)
const [friend, setFriend]=useState(null)
const [input, setInput] = useState("");
useEffect(()=>{
    const updateList = async ()=>{
        let results = users.filter((user)=>{
            const {username} = user
            return username.includes(input)

        }) 

      const searchField = results.map((user)=>{
        console.log(username)
            return(    
            <div className= "friend-choice">
                <p>{user.username}</p>
                <button className = "add-decline-btn"onClick = {()=>handleFriendRequest(user.userId)}> Add Friend </button>
            </div>
            )
        })
        setFriend(searchField) 
       
        
    }
    updateList(input)
},[users,input])

   

const handleFriendRequest = async (requesteeId) => {
    console.log("hit")

        await axios.post(`/api/request`, {
            requesteeId: requesteeId
        });
        let {data} = await axios.get('/api/findfriends')
        console.log(data)
        setUsers(data.userSearch)

};

    return (
        <div>
            <div className="closebtn" 
             onClick={() => setFriendRequestModalState(!friendRequestModalState)}>X
        </div>
        <div className = "modal">
            <div className = "friendsearch">
                <input value = {input} placeholder = "search friend" onChange = {(e)=> setInput (e.target.value)}/>
            </div>
        {friend}
        </div>
            
        
        </div>
    );
};

export default AddFriendModal;