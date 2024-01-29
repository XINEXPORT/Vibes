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
      console.log(results)
      //add <button onClick = {handleFriendRequest(user.userId)}> Add Friend </buton>
      //currently is crashing due to handler not working
      const searchField = results.map((user)=>{
            return(    
            <div className= "friend-choice">
                <p>{user.username}</p>
                <button onClick = {""}>Add Friend</button>
            </div>
            )
        })
        setFriend(searchField) 
    }
   
},[input])

   
// const handleFriendRequest = async (requesteeId) => {
//         const inputData = new FormData()
//         inputData.append('requesteeId', requesteeId)

//    try {
//         const {data} = await axios.post(`/api/request`, userId);

//         } catch (error) {
//             console.log (error)("Error requesting friend:", error)
//         }
//     };


    return (
        <div className = "addfriendmodal">
        <Form method = "POST" encType = 'multipart/form-data' className = "upload" >
        <Form.Group controlId="friendRequest" className="mb-3"></Form.Group>

        <Form.Label className = "friend-request">Search For Friends</Form.Label>
        <Form.Group controlId="friendId" className="mb-3">
            <Form.Control
                    type = "input"
                    onChange = {(e) => setInput(e.target.value)}
                    />
        </Form.Group>

        <div className = "friendchoices">
           {friend}
        </div>
            

        <div className = "friendreq-modalContainer"
        onClick={()=>setFriendRequestModalState(false)}> X 
        </div>
        
            </Form>
        </div>
    );
};

export default AddFriendModal;