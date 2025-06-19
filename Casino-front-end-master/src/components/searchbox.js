import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCasinos } from '../api/casinos';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [casinos, setCasinos] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all casinos on mount
    getCasinos().then(data => setCasinos(data)).catch(() => setCasinos([]));
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const filtered = casinos.filter(casino =>
      casino.name.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  }, [query, casinos]);

  const handleSearch = () => {
    if (!query.trim()) return;
    // Try to find a matching casino
    const match = casinos.find(casino =>
      casino.name.toLowerCase() === query.toLowerCase()
    );
    if (match) {
      navigate(`/casinos/${match.name.toLowerCase().replace(/\s+/g, '-')}`);
    } else if (suggestions.length > 0) {
      // If not exact, go to the first suggestion
      navigate(`/casinos/${suggestions[0].name.toLowerCase().replace(/\s+/g, '-')}`);
    } else {
      // Optionally, show a not found message
      alert('Casino not found');
    }
  };

  const handleSuggestionClick = (casino) => {
    setQuery(casino.name);
    setShowSuggestions(false);
    navigate(`/casinos/${casino.name.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="relative sm:w-[200px] lg:w-[800px] text-md md:text-md lg:text-2xl text-black max-w-full mx-auto flex items-center bg-white rounded-2xl shadow-md"
      style={{
        fontFamily: 'BigNoodleTitling',
        lineHeight: '1.2',
        wordSpacing: '0.1em',
        fontWeight: '100',
        letterSpacing: '0.05em',
      }}
    >
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onFocus={() => setShowSuggestions(suggestions.length > 0)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        placeholder="Find over 10,000 casinos"
        className="flex-1 basis-[70%] p-4 text-lg border-none outline-none rounded-l-2xl"
      />
      <button
        className="basis-[30%] bg-red-600 text-white p-5 mt-0 rounded-r-2xl hover:bg-red-700"
        onClick={handleSearch}
      >
        Search
      </button>
      {showSuggestions && (
        <ul className="absolute left-0 top-full w-full bg-white z-10 rounded-2xl shadow-lg max-h-60 overflow-y-auto text-black">
          {suggestions.map((casino, idx) => (
            <li
              key={casino._id || casino.name + idx}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer border-b"
              onMouseDown={() => handleSuggestionClick(casino)}
            >
              {casino.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
