import './SoundAccordion.css'

const SoundAccordion = ({ index, setActiveIndex, hidden, sounds}) =>{
    console.log(sounds);

    return(
        <div className = "modal">
            <section className = "sound-accordion">
                {sounds.map((sound, soundIndex) => (
                    <div key={soundIndex} className="accordion-tab" onClick={() => setActiveIndex(soundIndex)}>
                        {sound.sound}
        </div>
        ))}
       
        <div className={hidden ? 'hide accordion-info' : 'show accordion-info'}>
        
        </div>
        </section>
     </div>
    );
}

export default SoundAccordion