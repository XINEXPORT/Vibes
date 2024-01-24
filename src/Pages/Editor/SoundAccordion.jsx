import './SoundAccordion.css'
import { CiPlay1 } from "react-icons/ci";

const SoundAccordion = ({ setActiveIndex, hidden, sounds}) =>{
    console.log(sounds);

    return(
        <div className = "modal">
            <section className = "sound-accordion">
                {sounds.map((sound, soundIndex) => (
                    <div key={soundIndex} className="accordion-tab" onClick={() => setActiveIndex(soundIndex)}>
                        {sound.sound}
                       <div className="play-btn"> <CiPlay1 /></div>
        </div>
        ))}
       
        <div className={hidden ? 'hide accordion-info' : 'show accordion-info'}>
        </div>
        </section>
     </div>
    );
}

export default SoundAccordion