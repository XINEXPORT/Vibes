import './RoomHeader.css';
import RoomBackground from './RoomBackground.jsx';
import Room from './Room.jsx';
import Editor from '../Editor/SoundEditor.jsx';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import SoundEditor from '../Editor/SoundEditor.jsx';
import { CiPlay1, CiPause1 } from "react-icons/ci";
import { RxReset } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:8000');

const RoomHeader = () => {
    const dispatch = useDispatch();
    const {sounds, params} = useLoaderData();
    const user = useSelector(state => state.login.user);
    const mySounds = useSelector(state => state.favorites.mySounds);
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState(null);
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
    console.log(mySounds);

    useEffect(() => {
        if (params && user) {
            console.log(socket.id)
            socket.emit("join_room", {
                roomName: params.username,
                userJoin: user.username,
                id: socket.id
            });
        };
    }, [params]);
    
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
        socket.on("info_request", ({ id, host }) => {
            if (host === user.username) {
                console.log(user.username);
                socket.emit("send_info", {
                    user: id,
                    isPlaying: isPlaying,
                    time1: (audio1.current.currentTime + 0.22),
                    time2: (audio2.current.currentTime + 0.22),
                    time3: (audio3.current.currentTime + 0.22),
                    time4: (audio4.current.currentTime + 0.22),
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
        });
    }, [socket, soundOne, soundTwo, soundThree, soundFour, fxOne, fxTwo, fxThree, fxFour, isPlaying]);

    useEffect(() => {
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
            console.log(data);
            setIsPlaying(data.isPlaying);
            audio1.current.currentTime = data.time1;
            audio2.current.currentTime = data.time2;
            audio3.current.currentTime = data.time3;
            audio4.current.currentTime = data.time4;
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
        socket.on("accept_info", (data) => {
            console.log(data);
            setIsPlaying(data.isPlaying);
            setSoundOne(data.soundOne);
            setFxOne(data.fxOne);
            setSoundTwo(data.soundTwo);
            setFxTwo(data.fxTwo);
            setSoundThree(data.soundThree);
            setFxThree(data.fxThree);
            setSoundFour(data.soundFour);
            setFxFour(data.fxFour);
            audio1.current.currentTime = data.time1;
            audio2.current.currentTime = data.time2;
            audio3.current.currentTime = data.time3;
            audio4.current.currentTime = data.time4;
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
        socket.on('go_home', ()=>{
            console.log("hit")
            navigate('/')
            // alert (`The host has left the room`)
        })

        socket.on('joinfailed', ()=>{
            navigate(`/`)
            alert (`The host has not opened the room`)
        })

    }, [socket]);
    console.log(soundOne);

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
        } else{
            alert("Please select a sound");
        }
    };
    console.log(isPlaying);

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
        audio1.current.src = null;
        audio2.current.src = null;
        audio3.current.src = null;
        audio4.current.src = null;
        setBroadcastOne(!broadcastOne);
    };

    const setSoundscape = (ID) => {
        const [ soundscape ] = mySounds.filter((SC) => SC.soundscapeId === +ID);
        setSoundscapeId(+ID);

        if (soundscape && soundscape.sounds) {
            setSoundscapeName(soundscape.name);
            if (soundscape.sounds[0]) {
                if (soundscape.sounds[0] !== soundOne) {
                    setSoundOne(soundscape.sounds[0]);
                    setFxOne({
                        volume: soundscape.sounds[0].soundscapeSound.volume,
                        speed: soundscape.sounds[0].soundscapeSound.speed
                    });
                    setBroadcastOne(!broadcastOne);
                };
            } else {
                setSoundOne(null);
                setFxOne(null);
                setBroadcastOne(!broadcastOne);
            };
            if (soundscape.sounds[1]) {
                if (soundscape.sounds[1] !== soundTwo) {
                    setSoundTwo(soundscape.sounds[1]);
                    setFxTwo({
                        volume: soundscape.sounds[1].soundscapeSound.volume,
                        speed: soundscape.sounds[1].soundscapeSound.speed
                    });
                    setBroadcastOne(!broadcastOne);
                };
            } else {
                setSoundTwo(null);
                setFxTwo(null);
                setBroadcastOne(!broadcastOne);
            };
            if (soundscape.sounds[2]) {
                if (soundscape.sounds[2] !== soundThree) {
                    setSoundThree(soundscape.sounds[2]);
                    setFxThree({
                        volume: soundscape.sounds[2].soundscapeSound.volume,
                        speed: soundscape.sounds[2].soundscapeSound.speed
                    });
                    setBroadcastOne(!broadcastOne);
                };
            } else {
                setSoundThree(null);
                setFxThree(null);
                setBroadcastOne(!broadcastOne);
            };
            if (soundscape.sounds[3]) {
                if (soundscape.sounds[3] !== soundThree) {
                    setSoundFour(soundscape.sounds[3]);
                    setFxFour({
                        volume: soundscape.sounds[3].soundscapeSound.volume,
                        speed: soundscape.sounds[3].soundscapeSound.speed
                    });
                    setBroadcastOne(!broadcastOne);
                };
            } else {
                setSoundFour(null);
                setFxFour(null);
                setBroadcastOne(!broadcastOne);
            };
        };
    };

    // Function for saving soundscapes:
    const saveSounds = async(update) => {
        if (soundscapeName && (soundOne || soundTwo || soundThree || soundFour)) {
            let newSoundscape = {
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
            if (update) {
                const [ soundscape ] = mySounds.filter((SC) => SC.soundscapeId === +selectedId);
                const { soundCode } = soundscape;
                newSoundscape = {...newSoundscape, selectedId: selectedId, soundCode: soundCode};
            };
            await axios.post('/api/favs', newSoundscape);
            const { data: { favs } } = await axios.get('/api/sounds');
            dispatch({type: 'create', payload: favs});
            return;
        } else {
            if (soundscapeName) {
                alert("Please select atleast one sound");
            } else {
                alert('You must enter a name to save your soundscape.');
            };
        };
    };

    let mySoundscapes;
    if (mySounds) {
        mySoundscapes = mySounds.map((soundscape) => {
            const { name, soundscapeId } = soundscape;
            return <option key={soundscapeId} value={soundscapeId}>{name}</option>
        });
    };

    // //Delete a soundscape
    // const handleDeleteSoundscape = async (soundscapeId)=>{
    //     const soundscape = await axios.delete(`/api/deletesoundscape/${soundscapeId}` )
    // }
    console.log(selectedId);

    return(
        <div className="Header">
            <div className='header-wrapper'>
    
                <SoundEditor 
                isPlaying={isPlaying}
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
  

                <div className='panel'>
                    {mySounds ?
                    <div className="save-soundscape-div">
                        <label htmlFor="favorite-soundscapes">My Favorite Soundscapes</label>
                        <select className="save-soundscape-div" name="soundscape" onChange={(e) => {
                            if (e.target.value === 'Soundscapes') {
                                setSoundscape(null);
                                setSelectedId(null);
                            } else {
                                setSoundscape(e.target.value);
                                setSelectedId(e.target.value);
                            }
                            }}>
                            <option className="save-soundscape-div" value={null}>Soundscapes</option>
                            {mySoundscapes}
                        </select>
                        {/* <button 
                            name="soundscape-delete"
                            onClick={()=> handleDeleteSoundscape(soundscapeId)}
                        >Delete</button> */}
                    </div>
                    :
                    <></>
                    }
                    <div className='save-soundscape-div'>
                        <input className="save-soundscape-div" type="text" placeholder='Soundscape name' onChange={(e) => setSoundscapeName(e.target.value)} />
                        {/* <select className="save-soundscape-div"name="private-select" id="private-select" onChange={(e) => setIsPrivate(e.target.value)}>
                            <option value={true}>Private</option>
                            <option value={false}>Public</option>
                        </select> */}
                        {selectedId ?
                        <button className={selectedId ? 'save-soundscape-div both-btns' : 'save-soundscape-div'} onClick={() => {
                            saveSounds(true);
                        }}>Save Edits</button>
                        :
                        <></>
                        }
                        <button className={selectedId ? 'save-soundscape-div both-btns' : 'save-soundscape-div'} onClick={() => {
                            saveSounds(false);
                        }}>{selectedId ? 'Save New' : 'Save Soundscape'}</button>
                    </div>
                </div>

                <div className = "btn-container">
                    <div>
                    <RxReset id = "reset-btn"
                            onClick={() => handleReset()}/>
                    </div>
                    
                    <div className="play">
                        <button id="play-btn" onClick={() => playPause()}>
                        {isPlaying ? <CiPause1 /> : <CiPlay1 />}
                        </button>
                    </div>
                    <div>
                        {user ?
                        params ?
                        params.username === user.username ?
                        <div
                            className="live-room"
                            onClick={() => {
                                socket.emit('leave_room', {room:user.username})
                            }}
                        ><p>Close your live room</p>
                        </div>
                        :
                        <div
                            className='live-room'
                            onClick={() => {
                                navigate('/');
                            }}
                        ><p>Leave Room</p>
                        </div>
                        :
                        <div className = "not-live-room"
                            onClick={() => {
                                navigate(`/${user.username}`);
                            }}
                        ><p>Open a live room</p>
                        </div>
                        :
                        <></>
                        }
                    </div>
                </div>
                <div>
                    <audio ref={audio1} src={soundOne ? `../${soundOne.sound}` : null} loop />
                    <audio ref={audio2} src={soundTwo ? `../${soundTwo.sound}` : null} loop />
                    <audio ref={audio3} src={soundThree ? `../${soundThree.sound}` : null} loop />
                    <audio ref={audio4} src={soundFour ? `../${soundFour.sound}` : null} loop />
                </div>
            </div>
            <Room />
        </div>
    );
};

export default RoomHeader;