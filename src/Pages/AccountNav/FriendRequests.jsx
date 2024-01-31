import './FriendRequests.jsx'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

const FriendRequests =({ myRequests, user})=>{

    const [friendRequestResponse, setFriendRequestResponse] = useState(myRequests);
    
    useEffect((


    )=>{},[myRequests])

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
            requesteeId: userId,
            accept: accept
        });
       
       
        setFriendRequestResponse(data.myRequests)
    };

    let requests = <></>

    if(friendRequestResponse){
       
    requests = friendRequestResponse.map((request)=>{
            return(
            <div key = {request.user.userId}
                 className = "accept">
                <p>{request.user.username}</p>
                <button onClick = {()=>handleAcceptFriend
                    (request.user.userId, true)}>Accept Friend </button>
                 <button onClick = {()=>handleAcceptFriend
                    (request.user.userId, false)}>Decline Friend </button>
                </div>
)
        });
        
        console.log(requests)
    
    }

    return  (
    <div className = 'friend-requests'>
        <h4>Friend Requests</h4>
            <div className = "requestname">
             </div>
                {requests}
            </div>
)}



export default FriendRequests