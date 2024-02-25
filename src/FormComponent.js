import React, { useState } from 'react';
import Dropdown from './Dropdown';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    newCategory: '',
    inputText: '',
    selectedCategory: '',
    links: {},
    showDropdown: false,
  });

  const handleNewCategoryChange = (e) => {
    setFormData({
      ...formData,
      newCategory: e.target.value,
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      inputText: e.target.value,
    });
  };

  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      selectedCategory: e.target.value,
    });
  };

  const handleNewCategorySubmit = (e) => {
    e.preventDefault();
    const newCategory = formData.newCategory.trim();
    if (newCategory !== '') {
      setFormData({
        ...formData,
        links: {
          ...formData.links,
          [newCategory]: [],
        },
        newCategory: '',
        selectedCategory: newCategory,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLink = formData.inputText.trim();
    if (newLink !== '' && formData.selectedCategory !== '') {
      const { selectedCategory, links } = formData;
      setFormData({
        ...formData,
        links: {
          ...links,
          [selectedCategory]: [...links[selectedCategory], newLink],
        },
        showDropdown: true,
        inputText: '', // Clear the input after submission
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleNewCategorySubmit}>
        <label>
          Create New Category:
          <input
            type="text"
            value={formData.newCategory}
            onChange={handleNewCategoryChange}
          />
        </label>
        <button type="submit">Create Category</button>
      </form>

      <form onSubmit={handleSubmit}>
        <label>
          Type something:
          <input
            type="text"
            value={formData.inputText}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Select Category:
          <select
            value={formData.selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Select Category</option>
            {Object.keys(formData.links).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
      <Dropdown formData={formData} setFormData={setFormData} />
    </div>
  );
};

export default FormComponent;
