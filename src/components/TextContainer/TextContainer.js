
import './TextContainer.css';
import onlineIcon from '../../icons/onlineIcon.png';
import React from 'react';

const TextContainer = ({users}) => {
  return(
    <div className="textContainer">
    {
     users 
     ? 
     (
          <div>
            <h1>En línea :</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({name}) => (

                  <div key={name} className="activeItem">
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
     )
        :
      null
        
    }
  </div>
  )
};
export default TextContainer;