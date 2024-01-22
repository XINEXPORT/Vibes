import {useState} from 'react'
import axios from 'axios';

const MySettings = ({userId, email, password, setEmail, setPassword}) => {
    const [isEditing, setisEditing] = useState(false);

    const handleCancelClick=() => {
        setisEditing(false);
}}

const handleEditClick=()=>{
    setisEditing(true);
}

// const handleSoundUpload = (e)=>{}
// }

retun (
    <div className = "my-settings">
    <div>{username}</div>
    <div>{email}</div>
    <div>{password}</div>
    </div>
)






export default MySettings
