import './RoomHeader.css';
import Editor from '../Editor/SoundEditor.jsx';
import axios from 'axios';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import SoundEditor from '../Editor/SoundEditor.jsx';
import { CiPlay1 } from "react-icons/ci";


const RoomHeader = () =>{
    const {sounds, favs} = useLoaderData();
    const [selectedSounds, setSelectedSounds] = useState({sound1: null, sound2: null, sound3: null, sound4: null});
    const [soundOne, setSoundOne] = useState();
    const [fxOne, setFxOne] = useState();
    const [soundTwo, setSoundTwo] = useState();
    const [fxTwo, setFxTwo] = useState();
    const [soundThree, setSoundThree] = useState();
    const [fxThree, setFxThree] = useState();
    const [soundFour, setSoundFour] = useState();
    const [fxFour, setFxFour] = useState();
    const [soundscapeName, setSoundscapeName] = useState(null);
    const [isPrivate, setIsPrivate] = useState(true);
    

    // Function for saving soundscapes:
    const saveSounds = async() => {
        if (soundscapeName) {
            const newSoundscape = {
                name: soundscapeName,
                isPrivate: isPrivate,
                selectedSounds: {
                    sound1: {
                        sound: soundOne,
                        fx: fxOne
                    },
                    sound2: {
                        sound: soundTwo,
                        fx: fxTwo
                    },
                    sound3: {
                        sound: soundThree,
                        fx: fxThree
                    },
                    sound4: {
                        sound: soundFour,
                        fx: fxFour
                    }
                }
            };
            await axios.post('/api/favs', newSoundscape);
            return;
        } else {
            alert('You must enter a name to save your soundscape.');
        };
    };

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
            soundOne={soundOne}
            fxOne={fxOne}
            soundTwo={soundTwo}
            fxTwo={fxTwo}
            soundThree={soundThree}
            fxThree={fxThree}
            soundFour={soundFour}
            fxFour={fxFour}
            setSoundOne={setSoundOne}
            setFxOne={setFxOne}
            setSoundTwo={setSoundTwo}
            setFxTwo={setFxTwo}
            setSoundThree={setSoundThree}
            setFxThree={setFxThree}
            setSoundFour={setSoundFour}
            setFxFour={setFxFour}
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
                    <input type="text" placeholder='Soundscape name' onChange={(e) => setSoundscapeName(e.target.value)} />
                    <select name="private-select" id="private-select" onChange={(e) => setIsPrivate(e.target.value)}>
                        <option value={true}>Pivate</option>
                        <option value={false}>Public</option>
                    </select>
                    <button className='save-soundscape-btn' onClick={() => saveSounds()}>Save Soundscape</button>
                </div>
            </div>
            <div className="play">
                <button id="play-btn"><CiPlay1 /></button>
            </div>
        </div>
        
    )
}

export default RoomHeader