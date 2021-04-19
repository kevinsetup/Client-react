import React from 'react'
import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';
import './Input.css'
import sendButton from '../../icons/send.png'

const Input = ({ message, setMessage, sendMessage }) => {
return(
    <form action="">
        <input type="text"
        className = "input"
        placeholder = "Envia un mensaje..."
        value={message} 
        onChange= {(event) => setMessage(event.target.value)}
        onKeyPress = {event => event.key ==='Enter' ? sendMessage(event) : null}
        
        
        />
        <button className = "sendButton" onClick={ (event) => sendMessage(event)}><img src= {sendButton} style = {{width : "40px", height : "40px", background : 'white'}}></img></button>



    </form>
  );

}


export default Input;