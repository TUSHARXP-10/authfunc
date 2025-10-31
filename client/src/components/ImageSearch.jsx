import React, { useState } from 'react';
import axios from 'axios';
import MultiSelectCounter from './MultiSelectCounter';

const ImageSearch = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState({});

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/search', { query });
      setImages(res.data);
      setSelectedImages({}); // Clear selections on new search
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageSelect = (imageId) => {
    setSelectedImages((prevSelected) => ({
      ...prevSelected,
      [imageId]: !prevSelected[imageId],
    }));
  };

  const selectedCount = Object.values(selectedImages).filter(Boolean).length;

  return (
    <div className="image-search">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for images..."
        />
        <button type="submit">Search</button>
      </form>
      <MultiSelectCounter selectedCount={selectedCount} />
      <div className="image-grid">
        {images.map((image) => (
          <div
            key={image.id}
            className={`image-item ${selectedImages[image.id] ? 'selected' : ''}`}
          >
            <img src={image.urls.small} alt={image.alt_description} />
            <input
              type="checkbox"
              checked={selectedImages[image.id] || false}
              onChange={() => handleImageSelect(image.id)}
              className="image-checkbox"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSearch;