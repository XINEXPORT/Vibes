import './Chatroom.css'
import io from 'socket.io-client'
import {useState, useEffect} from 'react'

const socket = io.connect ('http://localhost:8000')

const Chatroom = ({user}) =>{
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])

    console.log(user)

    const sendMessage = () => {
        let messageArr = [...messages, {message: input, id: socket.id, user:user.username}]
        console.log(user)
        socket.emit("sendMessage", messageArr)
        setMessages(messageArr)
        setInput("")
        console.log(messageArr)
    }

    useEffect(()=>{
        socket.on("receiveMessage", (data) => {
            setMessages(data)
        })
    },[socket])

    useEffect(()=>{
        socket.on("userhasjoined", (data)=>{
            let messageArr = [...messages, {message: `${data} has joined the room` , id: "server", user:"Server"}]
            setMessages(messageArr)
        })
    },[socket]);
    console.log(messages)

    return(
        <div>
        <div id = "message-box">
            {messages.map(({message, id, user})=>{
                console.log(user)
                return(
                    <div className= 'message-wrapper'>
                        <p>{message}</p>
                        <p className = "user">{user}</p>
                    </div>
                )
        })}
        </div>
        <input 
            className= "input-box"
            type = "text" 
            value = {input} 
            placeholder = "type message..."
            onChange = {(e) => setInput(e.target.value)}
        ></input>
        <button onClick={sendMessage}> Send Message</button>
        </div>
    )
}

export default Chatroom; 