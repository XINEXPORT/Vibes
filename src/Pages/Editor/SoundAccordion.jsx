import './SoundAccordion.css'
import { useState, useEffect } from 'react';


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
    setFxFour
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
            case 3:
                sound = soundFour;
                fx = fxFour;
                setSound = setSoundFour;
                setFx = setFxFour;
                break;
            default:
        };

    useEffect(() => {
        return setVolume(fx ? fx.volume : 50);
    }, [activeIndex]);

    const [volume, setVolume] = useState(fx ? fx.volume : 50);
    const [visible, setVisible] = useState(null);

    return (
        <div id="accordion" className = {hidden ? "hide" : "show"}>
            <section className='sound-accordion'>
                {sounds.map((sound, soundIndex) => (
                    <section key = {soundIndex}>
                    <div 
                        id = {soundIndex}
                        key={soundIndex} 
                        className= "accordion-tab " 
                        onClick={()=> {
                            setVisible(soundIndex)
                            setFx({volume: volume})
                        }}
                    >
                        {sound.type}
                    </div>
    
                    <div 
                    className = {soundIndex === visible ? "accordion-drop show-details" : "accordion-drop hide-details"}>
                    {sound.sounds.map((soundObj)=>{

                        return(
                            <span className = "sound-details">
                            <div onClick={() => {
                                setSound(soundObj);
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
                    min="1" 
                    max="100"
                    value={volume} 
                    className="slider"
                    onChange ={(e)=>{
                        setVolume(e.target.value);
                        setFx({volume: volume});
                    }}
            />
            </div>
            <div>

            </div>
            <label>Playback Speed:</label>
            <select name="playback-speed" id="playback-speed">
                <option value="">0.25</option>
                <option value="">0.5</option>
                <option value="">0.75</option>
                <option value="">Normal</option>
                <option value="">1.25</option>
                <option value="">1.5</option>
                <option value="">1.75</option>
                <option value="">2</option>
            </select>
         </section>
         
     </div>
    );
}

export default SoundAccordion