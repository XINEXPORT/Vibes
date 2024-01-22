import {useSelector, useDispatch} from 'react-redux'
import {useState} from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import './LoginPage.css'

const LoginPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const page = useSelector(state =>state.page)

    //LOGIN STATE
    const [logUsername, setUsername] = useState('')
    const [logPassword, setLogPassword] = useState('')
    //REGISTER STATE
    const [regUsername, setRegUsername] = useState('')
    const [regEmail, setRegEmail] = useState('')
    const [regPassword, setRegPassword] = useState('')

    const loginUser = async()=>{
        if (logUsername && logPassword){
            const {data} =  await axios.post('/api/auth/login',{
                username: logUsername,
                password: logPassword
            })
            if(data.success){
                dispatch({type: 'login', payload: data.user})
                dispatch({type:'modal-off'})
            } else{
                alert('invalid data')
            }
            } else {
                alert('need both username and password')
            }
        }

        const registerUser = async()=>{
            if(regUsername && regPassword){
                const{data} = await
            }
        }
    }


