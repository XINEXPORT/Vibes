import './Settings.css';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button } from 'react-bootstrap'
import {useLoaderData} from 'react-router-dom'
import axios from 'axios'

//how to display my created soundscapes
//pass open modalstate
//useEffect(()=>{}, [openModal])
//return needs to show a fragment or the modal code
//return(openModal ? <> : <div>{soundscapes}</div>)

const Settings = ({openModal, closeModal, username, email, favs, toDelete, setToDelete}) => {
    const user = useSelector(state => state.login.user);

    const handleAudioUpload = (e)=>{
        const file = e.target.files[0];
        setAudio(file);
      }

      const handleSaveClick= async () => {
        const formData = new FormData()
            formData.append('audio', audio)

            let {data}=await axios.post(`/api/sounds`, formData)
      }

    let mySounds = <></>;
    if (favs) {
        mySounds = favs.map((soundscape) => {
            return <option key={soundscape.soundscapeId} value={soundscape.soundscapeId}>{soundscape.name}</option>
        });
    };

    console.log(toDelete)
    return(
        <div className = "modalBackground"> 
        <div >
            <div className = "modalContainer">
                <div className = "modalContainer-btn"
                onClick={()=>closeModal(false)}> X </div>
                <label className = "title">User Settings</label>         
                <label className = "username">Username</label>
                <div className = "form">{username}</div>
                <label className = "email">Email</label>
                <div className = "form">{email}</div>
                <div>
                    <select name="soundscape-deleter" onChange={(e) => setToDelete(e.target.value)}>
                        {mySounds}
                    </select>
                    <button onClick={async() => {
                        await axios.delete(`/api/deletesoundscape/${toDelete}`);
                    }}>Delete</button>
                </div>
              
                <Form method = "PUT" encType = 'multipart/form-data' className = "upload" >
                <Form.Group controlId="fileName" className="mb-3">
                <Form.Label className = "upload-sounds">Upload Sounds</Form.Label>

                <Form.Group controlId="name" className="mb-3">
                    <Form.Label> Sound Name </Form.Label>
                    <Form.Control
                    type = "text"
                    />
                </Form.Group>

                <Form.Control 
                    type="file" 
                    name= "audio" 
                    onChange= {handleAudioUpload}
                 />
                </Form.Group>
                </Form>

                <button className = "save-btn" onClick={handleSaveClick}>Save</button>

            </div>
            </div>
        </div>
    )
}

export default Settings