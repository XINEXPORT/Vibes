import {useState} from 'react'
import { useLoaderData } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import './SoundEditor.css'

const SoundEditor = () =>{
    const {sounds} = useLoaderData();
    const [activeIndex, setActiveIndex] = useState(null)
    console.log(activeIndex)

    const SoundEditor = ({sound, type, users}) =>{
        const [sound, setSound] = useState();
    }

    return (
        <div className = "SoundEditor">
        <div className = "sound-modal">
            <main>
                <button>Sound 1</button>
                <button>Sound 2</button>
                <button>Sound 3</button>
                <button>Sound 4</button>
            </main>
        </div>
        </div>
    )
}

export default SoundEditor  