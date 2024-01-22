import './Settings.css'
import {useState} from 'react'
import {useLoaderData} from 'react-router-dom'
import MySettings from '../Pages/MySettings.jsx'
import axios from 'axios'

const Settings = ()=>{
    const {userInfo} = useLoaderData();
    const [email, setEmail]=useState(userInfo.email)
    const [password, setPassword]=useState(userInfo.password)

    return(
        <div>
        <h1>User Settings</h1>
        <MySettings
        userId = {userInfo.userId}
        email = {userInfo.email}
        setEmail = {setEmail}
        password = {userInfo.password}
        setPassword = {setPassword}
        //Password will be hidden or hashed
        />
        <div>Upload Your Sounds</div>
        </div>
    )
}

export default Settings