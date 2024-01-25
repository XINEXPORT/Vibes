import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SoundAccordion from './SoundAccordion.jsx'
import './SoundEditor.css'

const SoundEditor = ({sounds, setSelectedSounds, selectedSounds}) =>{
 

    const dispatch = useDispatch();
    const modal = useSelector(state => state.editorOne.modal)

    //setActive Index is what sound we're editing
    const [activeIndex, setActiveIndex] = useState(null)

    return (
        <section id="editor">
        <div className = "sound-btns">
        <button onClick = {()=>setActiveIndex(1)}>Sound1</button>
        <button onClick = {()=>setActiveIndex(2)}>Sound2</button>
        <button onClick = {()=>setActiveIndex(3)}>Sound3</button>
        <button onClick = {()=>setActiveIndex(4)}>Sound4</button>
        </div>
        
                <SoundAccordion 
                    hidden={activeIndex === null} 
                    sounds={sounds} 
                    activeIndex={activeIndex} 
                    selectedSounds={selectedSounds} 
                    setSelectedSounds={setSelectedSounds}
                />
            
        </section>
    )
}

export default SoundEditor  