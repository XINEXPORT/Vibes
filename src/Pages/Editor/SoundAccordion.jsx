import './SoundAccordion.css'
import { useState } from 'react';

const SoundAccordion = ({sounds, activeIndex, selectedSounds, setSelectedSounds, hidden}) =>{
console.log(sounds);

    const [visible, setVisible] = useState(null)

    // const toggleAccordion = (index) =>{
    //     let newVisible = {...visible}

    //     newVisible[index] = !newVisible[index]
    //     setVisible (newVisible)
    // }

    console.log(visible)
        // ({...prevnewVisible
        //     [index]: !prevVisible[index],
        // })
    

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
         <section style={{color:"white"}}>FX</section>
     </div>
    );
}

export default SoundAccordion