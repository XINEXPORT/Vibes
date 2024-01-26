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
    const [deletesoundscape, deleteSoundScape] = useState(null);
    const [isPrivate, setIsPrivate] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);

    const audio1 = useRef(null);
    const audio2 = useRef(null);
    const audio3 = useRef(null);
    const audio4 = useRef(null);

    soundOne ? audio1.current.volume = fxOne ? fxOne.volume / 100 : .5 : null;
    soundTwo ? audio2.current.volume = fxTwo ? fxTwo.volume / 100 : .5 : null;
    soundThree ? audio3.current.volume = fxThree ? fxThree.volume / 100 : .5 : null;
    soundFour ? audio4.current.volume = fxFour ? fxFour.volume / 100 : .5 : null;

    const playPause = () => {
        if (soundOne || soundTwo || soundThree || soundFour) {
            if (!isPlaying) {
                setIsPlaying(!isPlaying);
                audio1.current.play();
                audio2.current.play();
                audio3.current.play();
                audio4.current.play();
            } else {
                setIsPlaying(!isPlaying);
                audio1.current.pause();
                audio2.current.pause();
                audio3.current.pause();
                audio4.current.pause();
            };
        };
    };

    const setSoundscape = (ID) => {
        const [ soundscape ] = favs.filter((SC) => SC.soundscapeId === +ID);
        if (soundscape.sounds) {
            if (soundscape.sounds[0]) {
                if (soundscape.sounds[0] !== soundOne) {
                    setSoundOne(soundscape.sounds[0]);
                    setFxOne({volume: soundscape.sounds[0].soundscapeSound.volume});
                };
            } else {
                setSoundOne(null);
                setFxOne(null);
            };
            if (soundscape.sounds[1]) {
                if (soundscape.sounds[1] !== soundTwo) {
                    setSoundTwo(soundscape.sounds[1]);
                    setFxTwo({volume: soundscape.sounds[1].soundscapeSound.volume});
                };
            } else {
                setSoundTwo(null);
                setFxTwo(null);
            };
            if (soundscape.sounds[2]) {
                if (soundscape.sounds[2] !== soundThree) {
                    setSoundThree(soundscape.sounds[2]);
                    setFxThree({volume: soundscape.sounds[2].soundscapeSound.volume});
                };
            } else {
                setSoundThree(null);
                setFxThree(null);
            };
            if (soundscape.sounds[3]) {
                if (soundscape.sounds[3] !== soundThree) {
                    setSoundFour(soundscape.sounds[3]);
                    setFxFour({volume: soundscape.sounds[3].soundscapeSound.volume});
                };
            } else {
                setSoundFour(null);
                setFxFour(null);
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
            console.log(soundscape)
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
                    <select name="soundscape" onChange={(e) => setSoundscape(e.target.value)}>
                        <option value={null}>Soundscapes</option>
                        {mySoundscapes}
                    </select>
                    <button name="soundscape-delete">Delete</button>
                </div>
                :
                <></>
                }
                <div className='save-soundscape-div'>
                    <input type="text" placeholder='Soundscape name' onChange={(e) => setSoundscapeName(e.target.value)} />
                    <select name="private-select" id="private-select" onChange={(e) => setIsPrivate(e.target.value)}>
                        <option value={true}>Private</option>
                        <option value={false}>Public</option>
                    </select>
                    <button className='save-soundscape-btn' onClick={() => saveSounds()}>Save Soundscape</button>
                </div>
            </div>
            <div className="play">
                <button id="play-btn" onClick={() => playPause()}><CiPlay1 /></button>
            </div>
            <div>
                <audio ref={audio1} src={soundOne ? soundOne.sound : null} loop />
                <audio ref={audio2} src={soundTwo ? soundTwo.sound : null} loop />
                <audio ref={audio3} src={soundThree ? soundThree.sound : null} loop />
                <audio ref={audio4} src={soundFour ? soundFour.sound : null} loop />
            </div>
        </div>
    )
}

export default RoomHeader