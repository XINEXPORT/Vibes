import {useState} from 'react'
import axios from 'axios';

const MySettings = ({userId, email, password, setEmail, setPassword}) => {
    const [isEditing, setisEditing] = useState(false);

    const handleEditClick=()=>{
        setisEditing(true);
    }

    const handleCancelClick=() => {
        setisEditing(false);
  
} 
    return (
    <div className = "my-settings">
    <div>{username}</div>
    <div>{email}</div>
    <div>{password}</div>
    </div>
    )
    }

    
// const handleSoundUpload = (e)=>{}
// }



export default MySettings
