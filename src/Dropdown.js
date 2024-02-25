import React, { useState } from 'react';

const TabGroup = ({ tabGroupName, links, handleLinkClick, handleCategoryExpand, handleLinkSubmit }) => {
  const [expanded, setExpanded] = useState(false);
  const [inputText, setInputText] = useState('');

  const toggleExpand = () => {
    setExpanded(!expanded);
    handleCategoryExpand(tabGroupName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() !== '') {
      handleLinkSubmit(tabGroupName, inputText);
      setInputText('');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', textAlign: 'left' }}>
      <p style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={toggleExpand}>
        {tabGroupName} Links
      </p>
      {expanded && (
        <div>
          {links.map((link, index) => (
            <div
              key={index}
              onClick={() => handleLinkClick(tabGroupName, link)}
              style={{ cursor: 'pointer', margin: '5px 0' }}
            >
              <a href={link} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            </div>
          ))}
          <form onSubmit={handleSubmit}>
            <label>
              Add Link:
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </label>
            <button type="submit">Submit</button>
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

  return (
    <div style={{ display: 'flex', height: '100vh', overflowX: 'hidden' }}>
      <div style={{ overflowY: 'auto', maxHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        {tabGroups.map((tabGroup, index) => (
          <TabGroup
            key={index}
            tabGroupName={tabGroup.tabGroupName}
            links={tabGroup.links}
            handleLinkClick={handleLinkClick}
            handleCategoryExpand={handleCategoryExpand}
            handleLinkSubmit={handleLinkSubmit}
          />
        ))}
      </div>
      <div style={{ margin: 'auto', textAlign: 'center' }}>
        <form onSubmit={handleSubmitTabGroup} style={{ display: 'inline-block' }}>
          <label>
            New Tab Group Name:
            <input
              type="text"
              value={newTabGroupName}
              onChange={(e) => setNewTabGroupName(e.target.value)}
            />
          </label>
          <button type="submit">Create Tab Group</button>
        </form>
      </div>
    </div>
  );
};

export default Dropdown;

