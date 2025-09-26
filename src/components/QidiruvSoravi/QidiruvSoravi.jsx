import React, { useState } from 'react';
import './QidiruvSoravi.css';

const QidiruvSoravi = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const people = [
    { id: 1, name: 'Ali Akbarov', username: '@aliakbarov', image: 'https://via.placeholder.com/40' },
    { id: 2, name: 'Mavluda Yusupova', username: '@mavluda_y', image: 'https://via.placeholder.com/40' },
    { id: 3, name: 'Hasan Rahimov', username: '@hasan_r', image: 'https://via.placeholder.com/40' },
    { id: 4, name: 'Zarina Ismailova', username: '@zarina_i', image: 'https://via.placeholder.com/40' },
    { id: 5, name: 'Sardor Qodirov', username: '@sardor_q', image: 'https://via.placeholder.com/40' },
    { id: 6, name: 'Nigora Karimova', username: '@nigora_k', image: 'https://via.placeholder.com/40' },
  ];

  const handleSearch = (query) => {
    if (query.trim() === '') {
      setSuggestions([]);
      return;
    }
    
    const filteredPeople = people.filter(person =>
      person.name.toLowerCase().includes(query.toLowerCase()) ||
      person.username.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filteredPeople);
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
  };

  return (
    <div className="qidiruv-container">
      <div className="search-header">
        <h2>Qidiruv</h2>
      </div>
      
      <div className="search-input-container">
        <div className="search-input-wrapper">
          <span className="search-icon"></span>
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Qidirish..."
            className="search-input"
            autoFocus
          />
          {searchQuery && (
            <button onClick={handleClearSearch} className="clear-button">
              ×
            </button>
          )}
        </div>
      </div>

      <div className="suggestions-container">
        {suggestions.length > 0 ? (
          <div className="suggestions-list">
            {suggestions.map((person) => (
              <div key={person.id} className="suggestion-item">
                <img src={person.image} alt={person.name} className="suggestion-avatar" />
                <div className="suggestion-info">
                  <div className="suggestion-name">{person.name}</div>
                  <div className="suggestion-username">{person.username}</div>
                </div>
              </div>
            ))}
          </div>
        ) : searchQuery ? (
          <div className="no-results">
            <p>Hech narsa topilmadi</p>
            <span>"{searchQuery}" uchun natija yo'q</span>
          </div>
        ) : (
          <div className="search-placeholder">
            <p>Qidirishni boshlang</p>
            <span>Foydalanuvchilar, postlar yoki hashtag'larni qidiring</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default QidiruvSoravi;