import Editor from '../Editor/SoundEditor.jsx'
import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import './RoomHeader.css'
import SoundEditor from '../Editor/SoundEditor.jsx'

const RoomHeader = () =>{
    const {sounds} = useLoaderData();
    console.log(sounds);
    // const {sounds} = soundz;


    return(
        <div className = "Header">
        <div>
        <SoundEditor/>
        </div>
        
        <div className = "fav-soundscape">
        <label for ="favorite-soundscapes">My Favorite Soundscapes</label>
        <select name = "soundscape" >
            <option value = "test">Test</option>
        </select>
        </div>

        <div className = "play">
        <button>Play</button>
        </div>

        </div>
        
    )
}

export default RoomHeader