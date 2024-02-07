import './Chatroom.css'
import {useState, useEffect, useRef} from 'react'
import { useParams } from 'react-router-dom'

const Chatroom = ({user,socket}) =>{
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const params = useParams()
    console.log(socket.id)
    console.log(messages)
    const messageField = useRef(null);

    const sendMessage = () => {
        let messageArr = [...messages, {message: input, id: socket.id, user:user.username}];
        socket.emit("sendMessage", {messages:messageArr,room:params.username});
        setInput("");
    }
console.log(socket)
    useEffect(()=>{
        console.log("hit")
        socket.on("receiveMessage", (data) => {
            messageField.current.scrollTop = messageField.current.scrollHeight;
            setMessages(data);
        });
        socket.on("userhasjoined", (data)=>{
            messageField.current.scrollTop = messageField.current.scrollHeight;
            setMessages(data.messages);
        });
       
    },[socket,params]);

    return(
        <div className= 'chatcontainer'>
        <div className='message-flex'>
            <div ref={messageField} className="message-box">
                {messages.map(({message, id, user})=>{
                   
                    return (
                        <div className='message-wrapper'>
                            <p className="user">{user}</p>
                            <p className='message'>{message}</p>
                        </div>
                    )
            })}
            </div>
        </div>
        <div className='send-msg-div'>
        <input
            className="input-box"
            type="text" 
            value={input} 
            placeholder="type message..."
            disabled={params.username ? false : true}
            onChange={(e) => setInput(e.target.value)}
        />
        <button disabled={params.username ? false : true} onClick={sendMessage}>Send Message</button>
    </div>
    </div>
    )
}

export default Chatroom; 