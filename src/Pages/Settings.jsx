import './Settings.css'
import {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {useLoaderData} from 'react-router-dom'
import MySettings from '../Pages/MySettings.jsx'
import axios from 'axios'

const Settings = ()=>{
    const user = useSelector(state => state.login.user);


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