import './FriendRequests.jsx'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

const FriendRequests =()=>{

    const [request, setRequest] = useState();
    const [friendRequestResponse, setFriendRequestResponse] = useState();


    const handleAcceptFriend = async (userId) => {
        console.log("hit")

        const {data} = await axios.post (`/api/respond`,{
            requestorId: requestorId
        });
    };

    return  (
    <div className = 'friend-requests'>
        <h4>Friend Requests</h4>
            <div>
                {}
            </div>
            </div>
)}





export default FriendRequests