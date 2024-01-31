import './SoundAccordion.css'
import { useState, useEffect } from 'react';
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:8000');


const SoundAccordion = ({
    sounds,
    activeIndex,
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
                                <div onClick={() => {
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
         <section style={{color:"black" , width:300}}>
            <h1>FX</h1>
            <label>Volume:</label>
            <div>
            <input 
                    type="range" 
                    min="0" 
                    max="100"
                    value={volume} 
                    className="slider"
                    onChange ={(e)=>{
                        setVolume(e.target.value);
                        const fxValues = {...fx};
                        setFx({...fxValues, volume: Number(e.target.value)});
                        setBroadcastOne(!broadcastOne);
                    }}
            />
            </div>
            <div>

            </div>
            <label>Playback Speed:</label>
            <select
                name="playback-speed"
                id="playback-speed"
                onChange={(e) => {
                    setSpeed(e.target.value);
                    const fxValues = {...fx};
                    setFx({...fxValues, speed: Number(e.target.value)});
                    setBroadcastOne(!broadcastOne);
                }}
            >
                <option selected={speed === 0.25 ? 'selected' : ''} value={0.25}>0.25</option>
                <option selected={speed === 0.5 ? 'selected' : ''} value={0.5}>0.5</option>
                <option selected={speed === 0.75 ? 'selected' : ''} value={0.75}>0.75</option>
                <option selected={speed === 1 ? 'selected' : ''} value={1}>Normal</option>
                <option selected={speed === 1.25 ? 'selected' : ''} value={1.25}>1.25</option>
                <option selected={speed === 1.5 ? 'selected' : ''} value={1.5}>1.5</option>
                <option selected={speed === 1.75 ? 'selected' : ''} value={1.75}>1.75</option>
                <option selected={speed === 2 ? 'selected' : ''} value={2}>2</option>
            </select>
         </section>
         
     </div>
    );
}

export default SoundAccordion