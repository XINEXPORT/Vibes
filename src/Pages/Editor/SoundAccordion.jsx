import './SoundAccordion.css'
import { useState, useEffect } from 'react';


const SoundAccordion = ({
    sounds,
    activeIndex,
    selectedSounds,
    setSelectedSounds,
    hidden,
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
    const [volume, setVolume] = useState(selectedSounds[`sound${activeIndex}`] ? selectedSounds[`sound${activeIndex}`].fx.volume : 50);
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
                            setVisible(soundIndex)}}
                    >
                        {sound.type}
                    </div>
    
                    <div 
                    className = {soundIndex === visible ? "accordion-drop show-details" : "accordion-drop hide-details"}>
                    {sound.sounds.map((soundObj)=>{

                        return(
                            <span className = "sound-details">
                            <div onClick={() => {
                                let newSoundList= {...selectedSounds }
                                newSoundList[`sound${activeIndex}`] = {sound: soundObj, fx:{volume:volume}}
                                setSelectedSounds(newSoundList);
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
                    className = "slider" 
                    onChange ={(e)=>{
                        setVolume(e.target.value)
                        let newSoundList= {...selectedSounds }
                        newSoundList[`sound${activeIndex}`] = {sound: soundObj, fx:{volume:volume}}
                        setSelectedSounds(newSoundList);}
                    }
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