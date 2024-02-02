import './RoomHeader.css';
import RoomBackground from './RoomBackground.jsx';
import Editor from '../Editor/SoundEditor.jsx';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import SoundEditor from '../Editor/SoundEditor.jsx';
import { CiPlay1, CiPause1 } from "react-icons/ci";
import { useSelector } from "react-redux";
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:8000');

const RoomHeader = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.login.user);
    const {sounds, favs, params} = useLoaderData();
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
    const [soundscapeId, setSoundscapeId] = useState(null);
    const [deletesoundscape, deleteSoundScape] = useState(null);
    const [isPrivate, setIsPrivate] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [myFavorites, setMyFavorites] = useState();
    const [broadcastOne, setBroadcastOne] = useState(false);
    const [broadcastTwo, setBroadcastTwo] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    console.log(params, user);
    
    useEffect(()=>{
        if (!user){
            setSoundOne(null);
            setSoundTwo(null);
            setSoundThree(null);
            setSoundFour(null);
            setFxOne(null);
            setFxTwo(null);
            setFxThree(null);
            setFxFour(null);
            setActiveIndex(null);
        };
    },[user]);

    useEffect(() => {
        if (params) {
            socket.emit("broadcast_sound", {
                room: params.username,
                soundOne: soundOne,
                fxOne: fxOne,
                soundTwo: soundTwo,
                fxTwo: fxTwo,
                soundThree: soundThree,
                fxThree: fxThree,
                soundFour: soundFour,
                fxFour: fxFour,
            });
        };
    }, [broadcastOne]);

    useEffect(() => {
        if (params) {
            socket.emit("broadcast_playstate", {
                room: params.username,
                isPlaying: isPlaying,
                time1: audio1.current.currentTime,
                time2: audio2.current.currentTime,
                time3: audio3.current.currentTime,
                time4: audio4.current.currentTime
            });
        };
    }, [broadcastTwo]);

    useEffect(() => {
        console.log('hit')
        socket.on("receive_sound", (data) => {
            console.log(data);
            setSoundOne(data.soundOne);
            setFxOne(data.fxOne);
            setSoundTwo(data.soundTwo);
            setFxTwo(data.fxTwo);
            setSoundThree(data.soundThree);
            setFxThree(data.fxThree);
            setSoundFour(data.soundFour);
            setFxFour(data.fxFour);
        });
        socket.on("receive_playstate", (data) => {
            console.log(data)
            setIsPlaying(data.isPlaying);
            audio1.current.currentTime = data.time1,
            audio2.current.currentTime = data.time2,
            audio3.current.currentTime = data.time3,
            audio4.current.currentTime = data.time4
            if (data.isPlaying) {
                audio1.current.play();
                audio2.current.play();
                audio3.current.play();
                audio4.current.play();
            } else {
                audio1.current.pause();
                audio2.current.pause();
                audio3.current.pause();
                audio4.current.pause();
            };
        });
    }, [socket]);

    useEffect(() => {
        if (isPlaying) {
            if (soundOne) {
                audio1.current.play();
            } else {
                audio1.current.pause();
            };
            if (soundTwo) {
                audio2.current.play();
            } else {
                audio2.current.pause();
            };
            if (soundThree) {
                audio3.current.play();
            } else {
                audio3.current.pause();
            };
            if (soundFour) {
                audio4.current.play();
            } else {
                audio4.current.pause();
            };
        };
    }, [soundOne, soundTwo, soundThree, soundFour]);

    const audio1 = useRef(null);
    const audio2 = useRef(null);
    const audio3 = useRef(null);
    const audio4 = useRef(null);

    soundOne ? audio1.current.volume = fxOne ? fxOne.volume / 100 : .5 : null;
    soundOne ? audio1.current.playbackRate = fxOne ? fxOne.speed : 1 : null;
    soundTwo ? audio2.current.volume = fxTwo ? fxTwo.volume / 100 : .5 : null;
    soundTwo ? audio2.current.playbackRate = fxTwo ? fxTwo.speed : 1 : null;
    soundThree ? audio3.current.volume = fxThree ? fxThree.volume / 100 : .5 : null;
    soundThree ? audio3.current.playbackRate = fxThree ? fxThree.speed : 1 : null;
    soundFour ? audio4.current.volume = fxFour ? fxFour.volume / 100 : .5 : null;
    soundFour ? audio4.current.playbackRate = fxFour ? fxFour.speed : 1 : null;
    console.log(audio1);

    const playPause = () => {
        if (soundOne || soundTwo || soundThree || soundFour) {
            if (!isPlaying) {
                setIsPlaying(true);
                setBroadcastTwo(!broadcastTwo);
                audio1.current.play();
                audio2.current.play();
                audio3.current.play();
                audio4.current.play();
            } else {
                setIsPlaying(false);
                setBroadcastTwo(!broadcastTwo);
                audio1.current.pause();
                audio2.current.pause();
                audio3.current.pause();
                audio4.current.pause();
            };
        };
    };

    const handleReset = () => {
        audio1.current.pause();
        audio2.current.pause();
        audio3.current.pause();
        audio4.current.pause();
        setIsPlaying(false);
        setSoundOne(null);
        setSoundTwo(null);
        setSoundThree(null);
        setSoundFour(null);
        setFxOne(null);
        setFxTwo(null);
        setFxThree(null);
        setFxFour(null);
    };

    const setSoundscape = (ID) => {
        const [ soundscape ] = favs.filter((SC) => SC.soundscapeId === +ID);
        setSoundscapeId(+ID)

        if (soundscape.sounds) {
            if (soundscape.sounds[0]) {
                if (soundscape.sounds[0] !== soundOne) {
                    setSoundOne(soundscape.sounds[0]);
                    setFxOne({
                        volume: soundscape.sounds[0].soundscapeSound.volume,
                        speed: soundscape.sounds[0].soundscapeSound.speed
                    });
                };
            } else {
                setSoundOne(null);
                setFxOne(null);
            };
            if (soundscape.sounds[1]) {
                if (soundscape.sounds[1] !== soundTwo) {
                    setSoundTwo(soundscape.sounds[1]);
                    setFxTwo({
                        volume: soundscape.sounds[1].soundscapeSound.volume,
                        speed: soundscape.sounds[1].soundscapeSound.speed
                    });
                };
            } else {
                setSoundTwo(null);
                setFxTwo(null);
            };
            if (soundscape.sounds[2]) {
                if (soundscape.sounds[2] !== soundThree) {
                    setSoundThree(soundscape.sounds[2]);
                    setFxThree({
                        volume: soundscape.sounds[2].soundscapeSound.volume,
                        speed: soundscape.sounds[2].soundscapeSound.speed
                    });
                };
            } else {
                setSoundThree(null);
                setFxThree(null);
            };
            if (soundscape.sounds[3]) {
                if (soundscape.sounds[3] !== soundThree) {
                    setSoundFour(soundscape.sounds[3]);
                    setFxFour({
                        volume: soundscape.sounds[3].soundscapeSound.volume,
                        speed: soundscape.sounds[3].soundscapeSound.speed
                    });
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
            console.log(fxOne)
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

    //Delete a soundscape
    const handleDeleteSoundscape = async (soundscapeId)=>{
        const soundscape = await axios.delete(`/api/deletesoundscape/${soundscapeId}` )
    }

    return(
        <div className="Header">
            <div className='header-wrapper'>
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
                setBroadcastOne={setBroadcastOne}
                broadcastOne={broadcastOne}
                activeIndex = {activeIndex}
                setActiveIndex = {setActiveIndex}
                />
                </div>
                <div>
                    <button
                        onClick={() => handleReset()}
                    >Reset</button>
                </div>
                <div className='select/save-div'>
                    {favs ?
                    <div className="fav-soundscape">
                        <label htmlFor="favorite-soundscapes">My Favorite Soundscapes</label>
                        <select name="soundscape" onChange={(e) => setSoundscape(e.target.value)}>
                            <option value={null}>Soundscapes</option>
                            {mySoundscapes}
                        </select>
                        <button 
                            name="soundscape-delete"
                            onClick={()=> handleDeleteSoundscape(soundscapeId)}
                        >Delete</button>
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
                        <button className='save-soundscape-btn' onClick={() => {
                            saveSounds();
                        }}>Save Soundscape</button>
                    </div>
                </div>
                <div className="play">
                    <button id="play-btn" onClick={() => playPause()}>
                    {isPlaying? <CiPause1 /> : <CiPlay1 />}
                    </button>
                </div>
                <div>
                    {user ?
                    params ?
                    params.username === user.username ?
                    <button
                    className="live-room-btn"
                    onClick={() => {
                        navigate(`/`);
                    }}
                    >Close your<br/>live room</button>
                    :
                    <></>
                    :
                    <button
                        className="live-room-btn"
                        onClick={() => {
                            navigate(`/${user.username}/room`);
                        }}
                    >Open a<br/>live room</button>
                    :
                    <></>
                    }
                </div>
                <div>
                    <audio ref={audio1} src={soundOne ? `../${soundOne.sound}` : null} loop />
                    <audio ref={audio2} src={soundTwo ? `../${soundTwo.sound}` : null} loop />
                    <audio ref={audio3} src={soundThree ? `../${soundThree.sound}` : null} loop />
                    <audio ref={audio4} src={soundFour ? `../${soundFour.sound}` : null} loop />
                </div>
            </div>
            <RoomBackground />
        </div>
    );
};

export default RoomHeader