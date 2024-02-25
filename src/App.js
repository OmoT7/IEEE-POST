import React, { useState } from 'react';
import './app_home.css'; // Import your CSS file
import Dropdown from './Dropdown';

function App() {
  // const [linkUrl, setLinkUrl] = useState('');
  // const [links, setLinks] = useState([]);

  // const handleSubmit =  (e) => {
  //   e.preventDefault();
  // }
  // const handleLinkInput = (event) => {
  //   setLinkUrl(event.target.value.trim());
  // };

  // const submitLink = () => {
  //   if (linkUrl !== '') {
  //     const newLinks = [...links];
  //     newLinks.push(linkUrl);
  //     setLinks(newLinks);
  //     setLinkUrl('');
  //   }
  // };



  return (

    <div>
    <Dropdown />
    </div>

    // <div className="container">
    //   <div className="middle">
    //     <h1>Hi, _____</h1>

    
    //   </div>
    //   <section id="LinkPlacement">
    //     <form onSubmit = {handleSubmit} id="link-form">
    //       <label htmlFor="link-input">Enter a link:</label>
    //       <input
    //         type="url"
    //         id="link-input"
    //         name="link-input"
    //         placeholder="https://example.com"
    //         required
    //         value={linkUrl}
    //         onChange={handleLinkInput}
    //       />
    //       <button type="button" onClick={submitLink}>
    //         Submit
    //       </button>
    //     </form>
    //   </section>
    //   <div id="link-display">
    //     {links.map((link, index) => (
    //       <div key={index} className="link-container">
    //         <a href={link} className="link">
    //           {link}
    //         </a>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
}

export default App;
