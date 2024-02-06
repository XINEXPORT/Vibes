import './Settings.css';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Form } from 'react-bootstrap'
import axios from 'axios'

//how to display my created soundscapes
//pass open modalstate
//useEffect(()=>{}, [openModal])
//return needs to show a fragment or the modal code
//return(openModal ? <> : <div>{soundscapes}</div>)

const Settings = ({ userId, username, email, favs, toDelete, setToDelete, modalState, setModalState}) => {
    const user = useSelector(state => state.login.user);
    const [audio, setAudio] = useState(null);
    const [type, setType] = useState(null);
    const [name, setName] = useState(null);
    const [code, setCode] = useState(null);
    const [success, setSuccess] = useState('');
    const [deleteSuccess, setDeleteSuccess] = useState('');

    const handleAudioUpload = (e)=>{
        const file = e.target.files[0];
        setAudio(file);
      };

      const handleSaveClick = async () => {
        const formData = new FormData()
        formData.append('userId', user.userId)
        formData.append('audio', audio)
        formData.append('name', name)
        formData.append('type', type)
    
        try {
            let { data } = await axios.post(`/api/sounds`, formData)
            setSuccess(<></>);
            setName('')
            setType('')
            setAudio(null)
            console.log(data);
        } catch (error) {
            console.error("Error uploading audio:", error);
        }
        };

        const handleDeleteClick = async () => {
            await axios.delete(`/api/deletesoundscape/${toDelete}`);
            setDeleteSuccess('Deletion successful!')
        }


    let mySounds = <></>;
    if (favs&&favs.length > 0) {
        mySounds = favs.map((soundscape) => {
            return <option key={soundscape.soundscapeId} value={soundscape.soundscapeId}>{soundscape.name}</option>
        });
    };

    return (
        <div className="modalContainer">
            <label className="title">User Settings</label>
            <div className='account-info'>
                <label className="username">Username</label>
                <div className="form">{username}</div>
                <label className="email">Email</label>
                <div className="form">{email}</div>
            </div>
            <div className='soundscape-settings'>
                <select name="soundscape-deleter" onChange={(e) => setToDelete(e.target.value)}>
                    <option value="" disabled selected>Select your soundscape</option>
                    {mySounds}
                </select>
                <span>
                    <button onClick={async() => {
                        await axios.delete(`/api/deletesoundscape/${toDelete}`);
                    }}>Delete</button>
                    <button onClick={async() => {
                        const { data: { soundCode } } = await axios.post('/api/getfav', {
                            id: toDelete
                        });
                        console.log(soundCode)
                        setCode(soundCode);
                    }}>Get soundscape code</button>
                </span>
                <span>
                    {code ?
                    <p>{code}</p>
                    :
                    <></>
                    }
                </span>
            </div>
            <div className='upload-soundscape'>
                <Form method="POST" encType='multipart/form-data' className="upload" >
                <Form.Group controlId="fileName" className="mb-3">
                <Form.Label className="upload-sounds">Upload Sounds</Form.Label>

                <Form.Group controlId="name" className="mb-3">
                    <Form.Label> Sound Name </Form.Label>
                    <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="type" className="mb-3">
                
                    <select className="form-control" 
                            id="exampleFormControlSelect1"
                            value={type}
                            onChange={(e)=>setType(e.target.value)}
                            >
                        <option value="" disabled selected>Select Sound Type</option>
                        <option>Environment</option>
                        <option>Ambient</option>
                        <option>Music</option>
                    </select>
                </Form.Group>

                <Form.Control 
                    type="file" 
                    name="audio" 
                    onChange={handleAudioUpload}
                />
                </Form.Group>
                </Form>
                {success && (
                     <div className="alert alert-success">
                            <strong>Success!</strong> {success}
                        </div>
                )}
                {deleteSuccess &&(
                    <div className="alert alert-success">
                        <strong>Deletion Successful!</strong> {success}
                    </div>
                )}
                <button className = "save-btn" onClick={handleSaveClick}>Save</button>
            </div>
        </div>
    );
};

export default Settings;