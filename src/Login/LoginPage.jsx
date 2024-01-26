import {useSelector, useDispatch} from 'react-redux'
import {useState} from 'react'
import axios from "axios"
import './LoginPage.css'

const LoginPage = () => {
    const dispatch = useDispatch();
    const modal = useSelector(state => state.login.modal);

    //LOGIN STATE
    const [logUsername, setLogUsername] = useState('');
    const [logPassword, setLogPassword] = useState('');
    //REGISTER STATE
    const [regUsername, setRegUsername] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');

    const loginUser = async()=>{
        if (logUsername && logPassword){
            const {data} =  await axios.post('/api/auth/login', {
                username: logUsername,
                password: logPassword
            });
            if(data.success){
                dispatch({type: 'login', payload: data.user});
                dispatch({type: 'modal-off'});
            } else{
                alert('invalid data');
            }
            } else {
                alert('need both username and password');
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
                alert('both username, email, & password required')
            }
        }

        return(
            <div style={{display: modal}} id="modal">
                <main id="forms">
                    <section className = "login">
                        <h1 className = "title">Login</h1>
                        <label htmlFor = "log-username">Username:</label>
                        <input type="text"
                            name = "log-username"
                            placeholder = "enter your username"
                            onChange = {(e)=> setLogUsername(e.target.value)}
                        />
                        <label htmlFor = "log-password">Password:</label>
                        <input type="password"
                            name = "log-password"
                            placeholder = "enter your password"
                            onChange = {(e)=> setLogPassword(e.target.value)}
                        />
                        <button onClick = {loginUser}>Login</button>
                    </section>

                    <section className = "register">
                        <h1 className = "title">Register</h1>
                        <label htmlFor = "reg-username">Username:</label>
                        <input type="text"
                            name = "reg-username"
                            placeholder = "enter your username"
                            onChange = {(e)=> setRegUsername(e.target.value)}
                        />
                        <label htmlFor = "reg-email">Email:</label>
                        <input type="text"
                            name = "reg-email"
                            placeholder = "enter your email"
                            onChange = {(e)=> setRegEmail(e.target.value)}
                        />
                        <label htmlFor = "reg-password">Password:</label>
                        <input type="password"
                            name = "reg-password"
                            placeholder = "enter your password"
                            onChange = {(e)=> setRegPassword(e.target.value)}
                        />
                        <button onClick = {registerUser}>Register</button>
                    </section>
                </main>
            </div>
        )
    }

    export default LoginPage
