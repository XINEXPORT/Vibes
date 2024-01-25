import {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SoundAccordion from './SoundAccordion.jsx';
import './SoundEditor.css';

const SoundEditor = ({
    sounds,
    setSelectedSounds,
    selectedSounds,
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
 

    const dispatch = useDispatch();
    const modal = useSelector(state => state.editorOne.modal);

    //setActive Index is what sound we're editing

    const [activeIndex, setActiveIndex] = useState(null)

    return (
        <section id="editor">
        <div className = "sound-btns">
            {selectedSounds.sound1 ?
            <button onClick = {()=>setActiveIndex(1)}>{selectedSounds.sound1.sound.name}</button>
            :
            <button onClick = {()=>setActiveIndex(1)}>Sound1</button>
            }
            {selectedSounds.sound2 ?
            <button onClick = {()=>setActiveIndex(2)}>{selectedSounds.sound2.sound.name}</button>
            :
            <button onClick = {()=>setActiveIndex(2)}>Sound2</button>
            }
            {selectedSounds.sound3 ?
            <button onClick = {()=>setActiveIndex(3)}>{selectedSounds.sound3.sound.name}</button>
            :
            <button onClick = {()=>setActiveIndex(3)}>Sound3</button>
            }
            {selectedSounds.sound4 ?
            <button onClick = {()=>setActiveIndex(4)}>{selectedSounds.sound4.sound.name}</button>
            :
            <button onClick = {()=>setActiveIndex(4)}>Sound4</button>
            }
        </div>
        
                <SoundAccordion 
                    hidden={activeIndex === null} 
                    sounds={sounds} 
                    activeIndex={activeIndex} 
                    selectedSounds={selectedSounds} 
                    setSelectedSounds={setSelectedSounds}
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
                />
            
        </section>
    )
}

export default SoundEditor  