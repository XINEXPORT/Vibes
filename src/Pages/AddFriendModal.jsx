import './AddFriendModal.css'
import axios from 'axios'
import {  Form } from 'react-bootstrap'
import { useState } from 'react';
import { useSelector } from "react-redux";

const AddFriendModal = ({searchInput, 
                        setSearchInput, 
                        friendReqList, 
                        setFriendReqList, 
                        userId, 
                        username, 
                        riendRequestModalState, 
                        setFriendRequestModalState
                    })=> {

const user = useSelector(state => state.login.user);
const [selectedFriend, setSelectedFriend] = useState(null);
const [friend, setFriend]=useState([])

   
const handleFriendRequest = async () => {
        const inputData = new FormData()
        inputData.append('friendId', friendId)

   try {
        const {data} = await axios.post(`/api/request`, userId);
        console.log(data);
        } catch (error) {
            console.log (error)("Error requesting friend:", error)
        }
    };

    return (
        <div>
        <Form method = "POST" encType = 'multipart/form-data' className = "upload" >
        <Form.Group controlId="friendRequest" className="mb-3"></Form.Group>

        <Form.Label className = "friend-request">Search For Friends</Form.Label>
        <Form.Group controlId="friendId" className="mb-3">
            <Form.Control
                    type = "input"
                    value = {friendId}
                    onChange = {(e) => setSelectedFriend(e.target.value)}
                    />
        </Form.Group>
            

        <div className = "friendreq-modalContainer"
        onClick={()=>setFriendRequestModalState(false)}> X 
        </div>

        <button className = "send-friendreq" onClick = {handleFriendRequest}>
            Send Friend Request
            </button>
            </Form>
        </div>
    );
};

export default AddFriendModal;