import Editor from '../Editor/Editor.jsx'
import { useState } from 'react'
import './RoomHeader.css'

const RoomHeader = () =>{
    return(
        <div className = "Header">
        <div>
        <Editor/>
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