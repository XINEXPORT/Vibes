import './FriendRequests.css'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

const FriendRequests =({ myFriends, myRequests, user, setFriendsList})=>{

    const [friendRequestResponse, setFriendRequestResponse] = useState(myRequests);

    useEffect((

    )=>{setFriendRequestResponse(myRequests)},[myRequests, myFriends])
    let userId 
    let username

    if (user){
        userId = user.userId
        username = user.username
    } 
        
    const handleAcceptFriend = async (userId, accept) => {

        const {data} = await axios.post (`/api/respond`,{
            requesteeId: userId,
            accept: accept
        });
       
        setFriendRequestResponse(data.myRequests)
        setFriendsList(data.myFriends)
    };

    let requests = <></>
    if(friendRequestResponse){
        requests = friendRequestResponse.map((request)=>{
            return(
                <div key = {request.user.userId}
                 className = "accept">
                    <p>{request.user.username}</p>
                    <button onClick = {() => handleAcceptFriend
                        (request.user.userId, true)}
                    >Accept Friend</button>
                    <button onClick = {() => handleAcceptFriend
                        (request.user.userId, false)}
                    >Decline Friend</button>
                </div>
            );
        });
    };

    return  (
        <div className = 'friend-requests'>
            <h4>Friend Requests</h4>
            <div className = "requestname">
                {requests}
            </div>
        </div>
    );
};



export default FriendRequests