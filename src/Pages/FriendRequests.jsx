import './FriendRequests.jsx'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

const FriendRequests =({ myRequests, user})=>{
    const [friendRequestResponse, setFriendRequestResponse] = useState(null);
    let userId 
    let username
    if (user){
        userId = user.userId
        username = user.username
    } 
        
    console.log(myRequests)

    const handleAcceptFriend = async (userId, accept) => {
        console.log("hit")

        const {data} = await axios.post (`/api/respond`,{
            requestorId: userId
        });
    };

    let requests = <></>
    if(myRequests ){
        requests = myRequests.map((user)=>{
            <div key = {user.userId}
                 className = "accept">
                <p>{user.username}</p>
                <button onClick = {()=>handleAcceptFriend
                    (user.userId, true)}>Accept Friend </button>
                 <button onClick = {()=>handleAcceptFriend
                    (user.userId, false)}>Decline Friend </button>
                </div>
        });
    }
        

    return  (
    <div className = 'friend-requests'>
        <h4>Friend Requests</h4>
            <div className = "requestname">
         
            </div>

            {friendRequestResponse}

         </div>
)}





export default FriendRequests