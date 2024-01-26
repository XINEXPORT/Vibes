import './Settings.css'
import {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {useLoaderData} from 'react-router-dom'
import axios from 'axios'

const Settings = ({closeModal, username, email})=>{
    const user = useSelector(state => state.login.user);


    return(
        <div className = "modalBackground">
            <div className = "modalContainer">
                <button 
                onClick={()=>closeModal(false)}> X </button>
                <label className = "title">User Settings</label>         
                <label className = "username">Username</label>
                    <div className = "form">{username}</div>
                <label className = "email">Email</label>
                    <div className = "form">{email}</div>
             </div>
        </div>
    )
}

export default Settings