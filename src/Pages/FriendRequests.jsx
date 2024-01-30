import './FriendRequests.jsx'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

const FriendRequests =({username, myFriends})=>{
    const [friendRequestResponse, setFriendRequestResponse] = useState(null);
    console.log(username)

    const handleAcceptFriend = async (userId) => {
        console.log("hit")

        const {data} = await axios.post (`/api/respond`,{
            requestorId: userId
        });
    };

    // useEffect(() => {
    //         const request = myFriends.map((user)=>{
    //                 <div key = {user.userId}
    //                      className = "accept">
    //                     <p>{user.username}</p>
    //                     <button onClick = {()=>handleAcceptFriend
    //                     (user.userId)}>Accept Friend </button>
    //                 </div>
    //         });
    // setFriendRequestResponse(request)
    // }, [myFriends, handleAcceptFriend])


    return  (
    <div className = 'friend-requests'>
        <h4>Friend Requests</h4>
            <div className = "requestname">
                {username}
            </div>
            {friendRequestResponse}
         </div>
)}





export default FriendRequests