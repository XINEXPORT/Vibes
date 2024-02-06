import './SoundAccordion.css'
import { useState, useEffect } from 'react';
import socketIO from 'socket.io-client';
import { IoClose } from "react-icons/io5";

const socket = socketIO.connect('http://localhost:8000');


const SoundAccordion = ({
    sounds,
    activeIndex,
    setActiveIndex,
    selectedSounds,
    setSelectedSounds,
    hidden,
    soundOne,
    fxOne,
    soundTwo,
    fxTwo,
    soundThree,
    fxThree,
    soundFour,
    fxFour,
    setSoundOne,
    setFxOne,
    setSoundTwo,
    setFxTwo,
    setSoundThree,
    setFxThree,
    setSoundFour,
    setFxFour,
    setBroadcastOne,
    broadcastOne
    }) => {
        let sound;
        let fx;
        let setSound;
        let setFx;
        switch(activeIndex) {
            case 1:
                sound = soundOne;
                fx = fxOne;
                setSound = setSoundOne;
                setFx = setFxOne;
                break;
            case 2:
                sound = soundTwo;
                fx = fxTwo;
                setSound = setSoundTwo;
                setFx = setFxTwo;
                break;
            case 3:
                sound = soundThree;
                fx = fxThree;
                setSound = setSoundThree;
                setFx = setFxThree;
                break;
            case 4:
                sound = soundFour;
                fx = fxFour;
                setSound = setSoundFour;
                setFx = setFxFour;
                break;
            default:
        };

    useEffect(() => {
        setVolume(fx ? fx.volume : 50);
        setSpeed(fx ? fx.speed : 1);
    }, [activeIndex]);

    const [volume, setVolume] = useState(fx ? fx.volume : 50);
    const [speed, setSpeed] = useState(fx ? fx.speed : 1);
    const [visible, setVisible] = useState(null);

    return (
        <div id="accordion" className = {hidden ? "hide" : "show"}>
            <section className='sound-accordion'>
                {sounds.map((sound, soundIndex) => (
                    <section key = {soundIndex}>
                    <div 
                        id = {soundIndex}
                        key={soundIndex} 
                        className= "accordion-tab" 
                        onClick={()=> {
                            setVisible(soundIndex);
                        }}
                    >
                        {sound.type}
                    </div>
                    <div 
                    className = {soundIndex === visible ? "accordion-drop show-details" : "accordion-drop hide-details"}>
                    {sound.sounds.map((soundObj)=>{
                        return (
                            <span className="sound-details" key={soundObj.soundId}>
                                <div className = "sound-name"onClick={() => {
                                    setSound(soundObj);
                                    setFx({
                                        volume: Number(volume),
                                        speed: Number(speed)
                                    });
                                    setBroadcastOne(!broadcastOne);
                                }}>
                                    {soundObj.name}
                                </div>
                                <audio src={soundObj.sound} controls></audio>
                            </span>
                        )
                    })}
                       </div>
                    </section>
          ))} 
         </section>
         <section className="fx">
         <IoClose className="close-accordion" onClick={()=>setActiveIndex(null)}/>
            <button onClick={() => {
                setSound(null);
                setFx(null);
                setVolume(50);
                setSpeed(1);
            }}>Void sound</button>
            <h1>FX</h1>
            <label>Volume:</label>
            <div class="rangeWarp">
            <input 
                    type="range" 
                    min="0" 
                    max="100"
                    value={fx ? fx.volume : volume} 
                    className="slider"
                    id="ticks"
                    onChange ={(e)=>{
                        setVolume(e.target.value);
                        const fxValues = {...fx};
                        setFx({...fxValues, volume: Number(e.target.value)});
                        setBroadcastOne(!broadcastOne);
                    }}
            />
            </div>
            <label>Playback Speed:</label>
            <div>
                <input
                    type="range"
                    min="1"
                    max="7"
                    step="0.1"
                    value={fx ? fx.speed * 4 : speed * 4}
                    className="slider"
                    id="ticks2"
                    onChange={(e) => {
                        setSpeed(e.target.value / 4);
                        const fxValues = {...fx};
                        setFx({...fxValues, speed: Number(e.target.value / 4)});
                        setBroadcastOne(!broadcastOne);
                    }}
                />
            </div>
         </section>
     </div>
    );
}

export default SoundAccordion