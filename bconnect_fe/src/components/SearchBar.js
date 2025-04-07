import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ handleSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState('Relevance');

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
    handleSearch(event.target.value);
  };

  const handleSortChange = (event) => {
    const selectedSortOption = event.target.value;
    setSelectedSort(selectedSortOption);
  };

  return (
    <div className="search-bar-container">
      <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
        <input type="text" value={searchQuery} onChange={handleChange} placeholder="Search products..." className="search-input" />
        <select className="sort-select" onChange={handleSortChange}>
          <option value="items">Items</option>
        </select>
        <i className="fas fa-search search-icon"></i>
      </form>
    </div>
  );
}

export default SearchBar;
