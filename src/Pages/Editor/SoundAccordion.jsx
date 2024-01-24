import './SoundAccordion.css'

const SoundAccordion = ({sounds, activeIndex, selectedSounds, setSelectedSounds, hidden}) =>{
console.log(sounds);
    return(
        <div>
            <section className={hidden ? 'hide sound-accordion' : 'show sound-accordion'}>
                {sounds.map((sound, soundIndex) => (
                    <section>
                    <div 
                        key={soundIndex} 
                        className="accordion-tab" 
                        >
                        {sound.type}
                    </div>
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
                       
                    </section>
          ))} 
       
        <div >
        </div>
         </section> 
     </div>
    );
}

export default SoundAccordion