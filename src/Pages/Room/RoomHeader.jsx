import Editor from '../Editor/SoundEditor.jsx'
import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import './RoomHeader.css'
import SoundEditor from '../Editor/SoundEditor.jsx'
import { CiPlay1 } from "react-icons/ci";


const RoomHeader = () =>{
    const {sounds} = useLoaderData();

    return(
        <div className = "Header">
        <div>
        <SoundEditor sounds = {sounds}/>
        </div>
        
        <div className = "fav-soundscape">
        <label htmlFor ="favorite-soundscapes">My Favorite Soundscapes</label>
        <select name = "soundscape" >
            <option value = "test">Test</option>
        </select>
        </div>

        <div className = "play">
        <button id = "play-btn"><CiPlay1 /></button>
        </div>

        </div>
        
    )
}

export default RoomHeader