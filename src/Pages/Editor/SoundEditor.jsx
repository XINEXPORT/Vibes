import {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SoundAccordion from './SoundAccordion.jsx';
import './SoundEditor.css';


const SoundEditor = ({
    sounds,
    setSelectedSounds,
    selectedSounds,
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


    const dispatch = useDispatch();
    const modal = useSelector(state => state.editorOne.modal);

    //setActive Index is what sound we're editing
    const [activeIndex, setActiveIndex] = useState(null);
    console.log(soundOne)

    return (
        <section id="editor">
        <div className = "sound-btns">
            {soundOne ?
            <button onClick = {()=>setActiveIndex(1)}>{soundOne.name}</button>
            :
            <button onClick = {()=>setActiveIndex(1)}>Sound1</button>
            }
            {soundTwo ?
            <button onClick = {()=>setActiveIndex(2)}>{soundTwo.name}</button>
            :
            <button onClick = {()=>setActiveIndex(2)}>Sound2</button>
            }
            {soundThree ?
            <button onClick = {()=>setActiveIndex(3)}>{soundThree.name}</button>
            :
            <button onClick = {()=>setActiveIndex(3)}>Sound3</button>
            }
            {soundFour ?
            <button onClick = {()=>setActiveIndex(4)}>{soundFour.name}</button>
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
                    soundOne={soundOne}
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