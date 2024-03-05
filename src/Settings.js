import React, { useState } from 'react';
import "./app_home.css";

const Settings = () => {
    const [showBox, setShowBox] = useState(false);
    const [userName, setUserName] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('#282c34')
  
    const handleButtonClick = () => {
      setShowBox(true);
    };
  
    const handleNameSubmit = (e) => {
      e.preventDefault();
      setShowBox(false);
    };

    return (
        <div className="settings">
          <header className="settings-header" style={{ backgroundColor: backgroundColor }}>
            {(!showBox || userName) && (
              <>
                {!showBox && <p>Welcome{userName ? `, ${userName}` : '!'}</p>}
                <button className="settings-button" onClick={handleButtonClick}>
                  Settings
                </button>
              </>
            )}
            {showBox && (
              <div className="settings-box">
                <form onSubmit={handleNameSubmit}>
                  <label>Enter your name:</label>
                  <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                  />
                  <br />
                  <label>Background color:</label>
                  <input 
                    type="text" 
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                  />
                  <br />
                  <button type="submit">Submit</button>
                </form>
              </div>
            )}
          </header>
        </div>
      );
}

export default Settings;
