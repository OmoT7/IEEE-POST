import React, { useState } from 'react';
import './app_home.css'; // Import your CSS file

function LinkSubmit() {
  const [linkUrl, setLinkUrl] = useState('');
  const [links, setLinks] = useState([]);

  const handleLinkInput = (event) => {
    setLinkUrl(event.target.value.trim());
  };

  const submitLink = () => {
    if (linkUrl !== '') {
      const newLinks = [...links];
      newLinks.push(linkUrl);
      setLinks(newLinks);
      setLinkUrl('');
    }
  };

  return (
    <div className="container">
      <input
        type="text"
        id="link-input"
        value={linkUrl}
        onChange={handleLinkInput}
        placeholder="Enter link URL"
      />
      <button onClick={submitLink}>Submit Link</button>

      <div id="link-display" className="link-display">
        {links.map((link, index) => (
          <div key={index} className="link-container">
            <a href={link} className="link">
              {link}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LinkSubmit;