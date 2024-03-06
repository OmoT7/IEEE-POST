import React, { useState } from 'react';
import "./app_home.css";

const TabGroup = ({ tabGroupName, links, handleLinkClick, handleCategoryExpand, handleLinkSubmit, handleLinkDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const [inputText, setInputText] = useState('');

  const toggleExpand = () => {
    setExpanded(!expanded);
    handleCategoryExpand(tabGroupName);
  };

  const handleMouseEnter = () => {
    // Handle mouse enter event if needed
  };

  const handleMouseLeave = () => {
    // Handle mouse leave event if needed
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() !== '') {
      handleLinkSubmit(tabGroupName, inputText);
      setInputText('');
    }
  };

  return (
    <div
    // The transitions for the the box that give its is underlying box shadow 
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        marginBottom: '10px',
        marginTop: '10px',
        textAlign: 'left',
        backgroundColor: '#3a5a40',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Adding a transition effect to transform and box-shadow properties
        transform: expanded ? 'translateY(-5px)' : 'translateY(0)', // Applying a translateY transformation on hover
        boxShadow: expanded ? '0px 5px 15px #9DBEBB' : 'none', // Applying a box shadow on hover
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <p
        style={{
          cursor: 'pointer',
          fontWeight: 'bold',
          color: 'white',
        }}
        onClick={toggleExpand}
      >
        {tabGroupName} Links
      </p>
      {expanded && (
        <div>
          {links.map((link, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <div
                onClick={() => handleLinkClick(tabGroupName, link)}
                style={{ cursor: 'pointer', margin: '5px 0' }}
              >
                                                                        {/* Link style */}
                <a href={link} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#588157', borderRadius: '5px', color: 'white' }}>
                  {link}
                </a>
              </div>
                                                                          {/* This is the style */}
              <button onClick={() => handleLinkDelete(tabGroupName, link)} style={{ marginLeft: '10px', backgroundColor: '#db504a', color: 'white', border: 'none', cursor: 'pointer' }}>
                Delete
              </button>
            </div>
          ))}
          <form onSubmit={handleSubmit}>
            <label style={{color: 'white'}}>
              Add Link:
              <input style={{margin:'10px'}}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </label>
            <button type="submit" style={{ backgroundColor: '#588157', color: 'white', border: 'none', cursor: 'pointer', height:'20px', borderRadius: '5px' }}>
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};


const Dropdown = () => {
  const [tabGroups, setTabGroups] = useState([]);
  const [newTabGroupName, setNewTabGroupName] = useState('');

  const handleLinkClick = (tabGroupName, link) => {
    console.log(`Selected Link in ${tabGroupName}: ${link}`);
    // You can perform additional actions here if needed
  };

  const handleCategoryExpand = (tabGroupName) => {
    // You can perform additional actions here if needed
  };

  const handleLinkSubmit = (tabGroupName, link) => {
    setTabGroups((prevTabGroups) => {
      const updatedTabGroups = [...prevTabGroups];
      const tabIndex = updatedTabGroups.findIndex((group) => group.tabGroupName === tabGroupName);

      if (tabIndex !== -1) {
        updatedTabGroups[tabIndex].links.push(link);
      } else {
        updatedTabGroups.push({
          tabGroupName: tabGroupName,
          links: [link],
        });
      }

      return updatedTabGroups;
    });
  };

  const handleLinkDelete = (tabGroupName, linkToDelete) => {
    setTabGroups((prevTabGroups) => {
      const updatedTabGroups = [...prevTabGroups];
      const tabIndex = updatedTabGroups.findIndex((group) => group.tabGroupName === tabGroupName);

      if (tabIndex !== -1) {
        updatedTabGroups[tabIndex].links = updatedTabGroups[tabIndex].links.filter(
          (link) => link !== linkToDelete
        );
      }

      return updatedTabGroups;
    });
  };

  const handleSubmitTabGroup = (e) => {
    e.preventDefault();
    if (newTabGroupName.trim() !== '') {
      setTabGroups((prevTabGroups) => [
        ...prevTabGroups,
        { tabGroupName: newTabGroupName, links: [] },
      ]);
      setNewTabGroupName('');
    }
  };

  // this is settings stuff
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
    <div >
      {/* This is the Dropbox */}
                                {/* This is the style for the drop box */}


    <header className="settings-header" style={{ backgroundColor: backgroundColor , overflowY: 'auto', maxHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', WebkitOverflowScrolling: 'touch' }}>

    <div className = "welcome">
    {(!showBox || userName) && (
              <>
                {!showBox && <p>Welcome{userName ? `, ${userName}` : '!'}</p>}
              </>
            )}
    </div>

    <button className="settings-button" onClick={handleButtonClick}>
                  Settings
                </button>

      <div className = "DropBox" style={{ overflowY: 'auto', maxHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', WebkitOverflowScrolling: 'touch' }}>
        {tabGroups.map((tabGroup, index) => (
          <TabGroup
            key={index}
            tabGroupName={tabGroup.tabGroupName}
            links={tabGroup.links}
            handleLinkClick={handleLinkClick}
            handleCategoryExpand={handleCategoryExpand}
            handleLinkSubmit={handleLinkSubmit}
            handleLinkDelete={handleLinkDelete}
          />
        ))}
      </div>
      <div style={{ margin: 'auto', textAlign: 'center', color: 'white', display: 'flex', alignItems: 'center' }}>
        <form onSubmit={handleSubmitTabGroup} style={{ display: 'inline-block' }}>
          <label style={{}}>
            New Tab Group Name:
            <input

              style={{marginLeft: '10px', marginRight: '10px', borderRadius: '10px', boxShadow: '#588157 0px 5px 15px'}}
              type="text"
              value={newTabGroupName}
              onChange={(e) => setNewTabGroupName(e.target.value)}
            />
          </label>
                                {/*style for button the button for creating a category*/}
          <button type="submit" style={{ backgroundColor: '#588157', color: 'white', border: 'none', cursor: 'pointer', width:'100px', height:'30px', borderRadius:'20px'}}>
            Create Tab Group
          </button>
        </form>
      </div>

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

      {/* <header className="settings-header" style={{ backgroundColor: backgroundColor }}>
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
          </header> */}
    </div>
  );
};


export default Dropdown;
