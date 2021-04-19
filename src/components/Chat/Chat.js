import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "../Chat/Chat.css";
import InfoBar from '../infoBar/infoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import TextContainer from '../TextContainer/TextContainer'
import Chatting from '../Chatting/Chatting'


let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState('');


  const ENDPOINT = "https://frontedparaelchat.herokuapp.com/";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    var connectionOptions = {
      "force new connection": true,
      reconnectionAttempts: "Infinity",
      timeout: 10000,
      transports: ["websocket"],
    };

    socket = io(ENDPOINT, connectionOptions);
    console.log(name, room);
    setName(name);
    setRoom(room);

    //console.log(socket);

    socket.emit("join", { name, room }, () => {});
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
   


  }, [messages]);
  
  useEffect(() => {
    socket.on('roomData', ({users}) => {
      setUsers(users);
    })
  }, [users])

  useEffect(() => {
    socket.on('Typing', ({users} ) => {
      setUsers(users);

    })

  });




const sendMessage = (event) =>{
    event.preventDefault();
    if(message){
        socket.emit('sendMessage', message, () => setMessage(''));
    }
}
//console.log(message, messages)
  return(
    <div className = "outerContainer">
        <div className="container">
        <InfoBar room = {room}/>
        <Messages messages = {messages} name = {name}/>

            <Input message = {message} setMessage ={setMessage} sendMessage= {sendMessage}/>
         
        </div>
        <TextContainer users={users}/>
        

    </div>

  )
};

export default Chat;
