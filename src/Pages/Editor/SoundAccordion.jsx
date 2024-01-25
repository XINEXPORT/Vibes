import './SoundAccordion.css'
import { useState } from 'react';

const SoundAccordion = ({sounds, activeIndex, selectedSounds, setSelectedSounds, hidden}) =>{

    const [visible, setVisible] = useState(null)

    console.log(visible)


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
    
                    <div className = {soundIndex === visible ? "accordion-drop show-details" : "accordion-drop hide-details"}>
                    {sound.sounds.map((soundObj)=>{

                        return(
                            <span className = "sound-details">
                            <div onClick={() => {
                                let newSoundList= {...selectedSounds, activeIndex:soundObj}
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
            <div></div>
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