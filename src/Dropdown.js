/*global chrome*/
import React, { useState, useEffect } from 'react';
import "./app_home.css"; // Importing CSS file for styling
import axois from 'axios';
import axios from 'axios';


// Component for rendering a single tab group
const TabGroup = ({ tabGroupName, links, handleLinkClick, handleCategoryExpand, handleLinkSubmit, handleLinkDelete }) => {
  const [expanded, setExpanded] = useState(false); // State to track if the tab group is expanded or not
  const [inputText, setInputText] = useState(''); // State to track the input text for adding new links

  // Function to toggle the expansion of the tab group
  const toggleExpand = () => {
    setExpanded(!expanded);
    handleCategoryExpand(tabGroupName);
  };

  // Handle mouse enter event (currently empty)
  const handleMouseEnter = () => {};

  // Handle mouse leave event (currently empty)
  const handleMouseLeave = () => {};

  // Handle form submission for adding new links
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() !== '') {
      handleLinkSubmit(tabGroupName, inputText);
      setInputText('');
    }
  };

  // Render the tab group component
  return (
    <div
      // Styles for the tab group container with transition effects
      style={{
        border: '10px solid #4E2A84',
        padding: '10px',
        marginBottom: '10px',
        marginTop: '10px',
        textAlign: 'left',
        backgroundColor: '#E4E0EE',
        borderRadius: '10px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: expanded ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: expanded ? '0px 5px 15px #4E2A84' : 'none',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Tab group name */}
      <p
        style={{
          cursor: 'pointer',
          fontWeight: 'bold',
          color: '#4E2A84',
        }}
        onClick={toggleExpand}
      >
        {tabGroupName} Links
      </p>
      {/* Conditionally render links and form for adding new links */}
      {expanded && (
        <div>
          {links.map((link, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              {/* Link */}
              <div
                onClick={() => handleLinkClick(tabGroupName, link)}
                style={{ cursor: 'pointer', margin: '5px 0' }}
              >
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: '#836EAA', borderRadius: '5px', color: 'white' }}
                >
                  {link}
                </a>
              </div>
              {/* Delete button */}
              <button
                onClick={() => handleLinkDelete(tabGroupName, link)}
                style={{
                  marginLeft: '10px',
                  backgroundColor: '#db504a',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </div>
          ))}
          {/* Form for adding new links */}
          <form onSubmit={handleSubmit}>
            <label style={{ color: '#4E2A84' }}>
              Add Link:
              <input
                style={{ margin: '10px' }}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </label>
            <button style={{ backgroundColor: "#836EAA" }} type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

// Main component for rendering the dropdown
const Dropdown = () => {
  // State for tab groups
  const [tabGroups, setTabGroups] = useState([]);
  const [newTabGroupName, setNewTabGroupName] = useState('');

  // Handle link click event
  const handleLinkClick = (tabGroupName, link) => {
    console.log(`Selected Link in ${tabGroupName}: ${link}`);
    // Additional actions can be performed here if needed
  };

  const generateLink = (input) => {
    // Check if the input starts with a valid protocol (e.g., http://, https://)
    const hasProtocol = /^(https?:\/\/)/.test(input);

    // Check if the input contains a valid top-level domain (TLD)
    const tldRegex = /\.(com|org|edu|gov|net|mil|[a-z]{2})$/i;
    const hasTLD = tldRegex.test(input);

    if (hasProtocol && hasTLD) {
      // The input is already a valid URL, return it as is
      return input;
    } else if (hasTLD) {
      // The input doesn't have a protocol, prepend "https://"
      return `https://${input}`;
    } else {
      // The input doesn't have a valid TLD, assume it's a subdomain or subdirectory
      const defaultDomain = "com"; // Replace with your desired default domain
      return `https://${input}.${defaultDomain}`;
    }
  };

  // Handle category expansion event
  const handleCategoryExpand = (tabGroupName) => {
    // Additional actions can be performed here if needed
  };

  // Handle link submission event
  const handleLinkSubmit = (tabGroupName, inputText) => {

    const link = generateLink(inputText);

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
      // chrome.storage.sync.set({ tabGroups: updatedTabGroups });
      return updatedTabGroups;
    });
  };

  // Handle link deletion event
  const handleLinkDelete = (tabGroupName, linkToDelete) => {
    setTabGroups((prevTabGroups) => {
      const updatedTabGroups = [...prevTabGroups];
      const tabIndex = updatedTabGroups.findIndex((group) => group.tabGroupName === tabGroupName);

      if (tabIndex !== -1) {
        updatedTabGroups[tabIndex].links = updatedTabGroups[tabIndex].links.filter(
          (link) => link !== linkToDelete
        );
      }
      chrome.storage.sync.set({ tabGroups: updatedTabGroups });
      return updatedTabGroups;
    });
  };

  // Handle tab group submission event
  const handleSubmitTabGroup = (e) => {
  e.preventDefault();
  if (newTabGroupName.trim() !== '') {
    setTabGroups((prevTabGroups) => {
      const updatedTabGroups = [
        ...prevTabGroups,
        { tabGroupName: newTabGroupName, links: [] },
      ];

      // chrome.storage.sync.set({ tabGroups: updatedTabGroups }); // Save updated tabGroups to Chrome storage
      setNewTabGroupName('');
      return updatedTabGroups;
    });
  }
};

  // State for settings box
  const [showBox, setShowBox] = useState(false);
  const [userName, setUserName] = useState('');
  const [backgroundColorPage, setBackgroundColorPage] = useState('#836EAA'); // Default background color
 

  // Handle settings button click event
  const handleButtonClick = () => {
    setShowBox(true);
  };



  // Handle name submission event
  const handleNameSubmit = async (e) => {
    e.preventDefault();


    try {
      // Make a POST request to the server endpoint
      const response = await axios.post('http://ec2-3-19-27-237.us-east-2.compute.amazonaws.com/tabs/userid', {
        userName // Assuming userName is a state variable holding the user's name
      });
  
      // Handle successful response
      console.log('User name sent to server:', response.data);
      
      // Optionally, you can perform additional actions here if needed
  
      // Hide the settings box after successfully submitting the user name
      setShowBox(false);
    } catch (error) {
      // Handle errors
      console.error('Error sending user name:', error);
      // Optionally, display an error message to the user 
    }
  };

  // Render the dropdown component
  return (
    <div>
      {/* Header with settings */}
      <header className="settings-header" style={{ backgroundColor: backgroundColorPage }}>
        {/* Welcome message */}
        <div className="welcome">
          {(!showBox || userName) && (<> {!showBox && <p>Welcome{userName ? `, ${userName}` : '!'}</p>} </>)}
        </div>
        {/* Settings button */}
        <button className="settings-button" onClick={handleButtonClick}>
          <img src="purple_gear_final.png" style={{ height: "50px", width: "50px" }} />
        </button>

        {/* Settings box pop-up */}
        {showBox && (
          <div className="settings-box">
            <form onSubmit={handleNameSubmit}>
              {/* Name input field */}
              <label>Enter your name:</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <br />

              {/* Background color input field */}
              <label>Background color:</label>
              <input
                type="text"
                value={backgroundColorPage}
                onChange={(e) => setBackgroundColorPage(e.target.value)}
              />
                <br />
                {/* submit button */}
                <button type="submit" className = "submit-button" > Submit </button>
                
            </form>
          </div>
        )}      

        {/* dropbox style stuff */}
        <div className = "DropBox" style={{ overflowY: 'auto', maxHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', WebkitOverflowScrolling: 'touch', position: 'absolute' }}>
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

        {/* create new tab group */}
        <div 
        className='UI'>
          <form onSubmit={handleSubmitTabGroup} style={{ display: 'flex', flexDirection: "column", alignItems: 'center' }}>
            <label style={{marginBottom: '10px', color: '#5B3B8C', fontSize: "30px", fontFamily: 'cursive'}}>
              New Tab Group Name:
            </label>
            <input
                type="text"
                className='textInput'
                value={newTabGroupName}
                onChange={(e) => setNewTabGroupName(e.target.value)}
              />
            <button type="submit" className= "create-button" >
              Create Tab Group
            </button> 
          </form>
        </div>

      </header>
    </div>
  );
};


export default Dropdown;
