import {useSelector, useDispatch} from 'react-redux';
import {useState} from 'react';
import { useNavigate } from 'react-router';
import axios from "axios";
import './LoginPage.css';

const LoginPage = () => {
    const dispatch = useDispatch();
    const modal = useSelector(state => state.login.modal);
    const navigate = useNavigate();

    //LOGIN STATE
    const [logUsername, setLogUsername] = useState('');
    const [logPassword, setLogPassword] = useState('');
    //REGISTER STATE
    const [regUsername, setRegUsername] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    
    const getSounds = async() => {
        const { data: { favs } } = await axios.get('/api/sounds');
        dispatch({type: 'login-get', payload: favs});
    };

    const loginUser = async() => {
        if (logUsername && logPassword){
            const {data} =  await axios.post('/api/auth/login', {
                username: logUsername,
                password: logPassword
            });
            if(data.success){
                getSounds();
                dispatch({type: 'login', payload: data.user});
                dispatch({type: 'modal-off'});
            } else{
                alert('Username and Password Not Found');
            }
            } else {
                alert('Both Username and Password Required');
            };
        };

        const registerUser = async()=>{
            if(regUsername && regPassword && regEmail){
                const {data} = await axios.post ('/api/auth/register', {
                    username: regUsername,
                    email: regEmail,
                    password: regPassword
                })
                if(data.success){
                    dispatch({type: 'login', payload: data.user})
                    dispatch({type: 'modal-off'})
                }else{
                    alert('invalid data')
                }
            } else{
                alert('Both Username, Email, and Password Required')
            }
        }

        return(
            <div style={{display: modal}} id="modal">
                <main id="forms">
                    <section className = "login">
                        <h1 className = "title">Login</h1>
                        <label htmlFor = "log-username">Username:</label>
                        <input 
                            className = "input-boxes"
                            type="text"
                            name = "log-username"
                            placeholder = "enter your username"
                            onChange = {(e)=> setLogUsername(e.target.value)}
                        />
                        <label htmlFor = "log-password">Password:</label>
                        <input 
                            className = "input-boxes"
                            type="password"
                            name = "log-password"
                            placeholder = "enter your password"
                            onChange = {(e)=> setLogPassword(e.target.value)}
                        />
                        <button 
                            className = "action-button"
                            onClick = {() => {
                            loginUser();
                            navigate('/');
                            }}>Login</button>
                    </section>

                    <section className = "register">
                        <h1 className = "title">Register</h1>
                        <label htmlFor = "reg-username">Username:</label>
                        <input 
                            className = "input-boxes"
                            type="text"
                            name = "reg-username"
                            placeholder = "enter your username"
                            onChange = {(e)=> setRegUsername(e.target.value)}
                        />
                        <label htmlFor = "reg-email">Email:</label>
                        <input 
                            className = "input-boxes"
                            type="text"
                            name = "reg-email"
                            placeholder = "enter your email"
                            onChange = {(e)=> setRegEmail(e.target.value)}
                        />
                        <label htmlFor = "reg-password">Password:</label>
                        <input 
                            className = "input-boxes"
                            type="password"
                            name = "reg-password"
                            placeholder = "enter your password"
                            onChange = {(e)=> setRegPassword(e.target.value)}
                        />
                        <button 
                            className = "action-button"
                            onClick={() => {
                            registerUser();
                            navigate('/');
                        }
                        }>Register</button>
                    </section>
                </main>
            </div>
        )
    }

    export default LoginPage
