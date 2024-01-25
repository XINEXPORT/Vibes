import Editor from '../Editor/SoundEditor.jsx';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import './RoomHeader.css';
import SoundEditor from '../Editor/SoundEditor.jsx';
import { CiPlay1 } from "react-icons/ci";


const RoomHeader = () =>{
    const {sounds, favs} = useLoaderData();
    const [selectedSounds, setSelectedSounds] = useState({sound1:null,sound2:null, sound3:null, sound4:null})
    console.log(selectedSounds)

    let mySoundscapes;
    if (favs) {
        mySoundscapes = favs.map((soundscape) => {
            const { name, soundscapeId } = soundscape;
            return <option key={soundscapeId} value={soundscapeId}>{name}</option>
        });
    };

    return(
        <div className="Header">
            <div>
            <SoundEditor 
            sounds={sounds}
            selectedSounds={selectedSounds}
            setSelectedSounds={setSelectedSounds}
            />
            </div>
            <div className='select/save-div'>
                {favs ?
                <div className="fav-soundscape">
                    <label htmlFor="favorite-soundscapes">My Favorite Soundscapes</label>
                    <select name="soundscape">
                        {mySoundscapes}
                    </select>
                </div>
                :
                <></>
                }
                <div className='save-soundscape-div'>
                    <button className='save-soundscape-btn' onClick={async() => {
                        await axios.post('/api/favs', selectedSounds);
                    }}>Save Soundscape</button>
                </div>
            </div>
            <div className="play">
                <button id="play-btn"><CiPlay1 /></button>
            </div>
        </div>
        
    )
}

export default RoomHeader