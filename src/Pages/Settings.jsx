import './Settings.css'
import {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {useLoaderData} from 'react-router-dom'
import axios from 'axios'

const Settings = ({closeModal, username, email})=>{
    const user = useSelector(state => state.login.user);

    const handleAudioUpload = (e)=>{
        const file = e.target.files[0];
        setAudio(file);
      }

      const handleSaveClick= async () => {
        const formData = new FormData()
        formData.append('audio', audio)
      }

    return(
        <div className = "modalBackground">
            <div className = "modalContainer">
                <div className = "modalContainer-btn"
                onClick={()=>closeModal(false)}> X </div>
                <label className = "title">User Settings</label>         
                <label className = "username">Username</label>
                    <div className = "form">{username}</div>
                <label className = "email">Email</label>
                    <div className = "form">{email}</div>
             </div>
             <>  
                {/* <Form method = "PUT" encType = 'multipart/form-data' >
                <Form.Group controlId="fileName" className="mb-3">
                <Form.Label>Upload Sounds</Form.Label>
                <Form.Control 
                    type="file" 
                    name= "audio" 
                    onChange= {handleAudioUpload}
                 />
                </Form.Group>
                </Form> */}
            </>
        </div>
    )
}

export default Settings