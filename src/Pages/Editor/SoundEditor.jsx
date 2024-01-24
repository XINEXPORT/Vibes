import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SoundAccordion from './SoundAccordion.jsx'
import './SoundEditor.css'

const SoundEditor = ({sounds}) =>{
    console.log(sounds)

    const dispatch = useDispatch();
    const modal = useSelector(state => state.editorOne.modal)

    //setActive Index is what sound we're editing
    const [activeIndex, setActiveIndex] = useState(null)
    const [selectedSounds, setSelectedSounds] = useState({1:null,2:null, 3:null, 4:null})

    return (
        <div>
        <button onClick = {()=>setActiveIndex(1)}>Sound1</button>
        <button onClick = {()=>setActiveIndex(2)}>Sound2</button>
        <button onClick = {()=>setActiveIndex(3)}>Sound3</button>
        <button onClick = {()=>setActiveIndex(4)}>Sound4</button>

        <div>
        
                <SoundAccordion hidden={activeIndex === null} sounds={sounds} activeIndex={activeIndex} selectedSounds={selectedSounds} setSelectedSounds={setSelectedSounds}/>
            
        <div className = "SoundEditor">
          
            {/* {isSound1ModalOpen &&(
                <div className="modal">
                <SoundAccordion sounds = {sounds}/>
                <button id="btn-close" onClick= {()=> setIsSound1ModalOpen(false)}>Close</button>
                </div>
            )} */}
        </div>
        </div>
        </div>
    )
}

export default SoundEditor  