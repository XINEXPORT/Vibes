import './RoomHeader.css';
import Editor from '../Editor/SoundEditor.jsx';
import axios from 'axios';
import { useState, useRef } from 'react';
import { useLoaderData } from 'react-router-dom';
import SoundEditor from '../Editor/SoundEditor.jsx';
import { CiPlay1 } from "react-icons/ci";


const RoomHeader = () =>{
    const {sounds, favs} = useLoaderData();
    const [selectedSounds, setSelectedSounds] = useState({sound1: null, sound2: null, sound3: null, sound4: null});
    const [soundOne, setSoundOne] = useState(null);
    const [fxOne, setFxOne] = useState(null);
    const [soundTwo, setSoundTwo] = useState(null);
    const [fxTwo, setFxTwo] = useState(null);
    const [soundThree, setSoundThree] = useState(null);
    const [fxThree, setFxThree] = useState(null);
    const [soundFour, setSoundFour] = useState(null);
    const [fxFour, setFxFour] = useState(null);
    const [soundscapeName, setSoundscapeName] = useState(null);
    const [isPrivate, setIsPrivate] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);

    const audio1 = useRef(null);
    const audio2 = useRef(null);
    const audio3 = useRef(null);
    const audio4 = useRef(null);
    

    console.log(audio1)

    const playPause = () => {
        if (soundOne || soundTwo || soundThree || soundFour) {
            if (!isPlaying) {
                audio1.current.play();
                audio2.current.play();
                audio3.current.play();
                audio4.current.play();
                setIsPlaying(!isPlaying);
            } else {
                audio1.current.pause();
                audio2.current.pause();
                audio3.current.pause();
                audio4.current.pause();
                setIsPlaying(!isPlaying);
            };
        };
    };
    
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
                <button id="play-btn" onClick={() => playPause()}><CiPlay1 /></button>
            </div>
            <div>
                <audio ref={audio1} src={soundOne ? soundOne.sound : null} volume={fxOne ? fxOne.volume : null} />
                <audio ref={audio2} src={soundTwo ? soundTwo.sound : null} />
                <audio ref={audio3} src={soundThree ? soundThree.sound : null} />
                <audio ref={audio4} src={soundFour ? soundFour.sound : null} />
            </div>
        </div>
    )
}

export default RoomHeader