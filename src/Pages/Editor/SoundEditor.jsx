import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SoundAccordion from './SoundAccordion.jsx'
import './SoundEditor.css'

const SoundEditor = ({sounds}) =>{
    console.log(sounds);
    const dispatch = useDispatch();
    const modal = useSelector(state => state.editorOne.modal)
    const [isSound1ModalOpen, setIsSound1ModalOpen] = useState(false);
    const [isSound2ModalOpen, setIsSound2ModalOpen] = useState(false);
    const [isSound3ModalOpen, setIsSound3ModalOpen] = useState(false);
    const [isSound4ModalOpen, setIsSound4ModalOpen] = useState(false);

    const openSound1Modal = () =>{
        setIsSound1ModalOpen(true); 
    }
    const openSound2Modal = () =>{
        setIsSound1ModalOpen(true); 
    }
    const openSound3Modal = () =>{
        setIsSound1ModalOpen(true); 
    }
    const openSound4Modal = () =>{
        setIsSound1ModalOpen(true); 
    }

    return (
        <div className = "SoundEditor">
            <div>
                <button onClick = {openSound1Modal}>Sound 1</button>
                <button onClick = {openSound2Modal}>Sound 2</button>
                <button onClick = {openSound3Modal}>Sound 3</button>
                <button onClick = {openSound4Modal}>Sound 4</button>
            </div>

            {isSound1ModalOpen &&(
                <div className="modal">
                <SoundAccordion sounds = {sounds}/>
                <button className="btn-close" onClick= {()=> setIsSound1ModalOpen(false)}>Close</button>
                </div>
            )}
        </div>
    )
}

export default SoundEditor  