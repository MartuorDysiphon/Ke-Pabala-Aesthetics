import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SearchModal.css';

const SearchModal = ({ isOpen, onClose, searchResults, searchQuery, onSearch }) => {
  const [query, setQuery] = useState(searchQuery || '');
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved).slice(0, 4));
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        const input = document.querySelector('.search-input');
        if (input) input.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    onSearch(suggestion);
    const updated = [suggestion, ...recentSearches.filter(s => s !== suggestion)].slice(0, 4);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="search-header">
          <div className="search-input-container">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              value={query}
              onChange={(e) => {
                const value = e.target.value;
                setQuery(value);
                onSearch(value);
                
                // Save to recent searches when query is not empty
                if (value.trim()) {
                  const updated = [value, ...recentSearches.filter(s => s !== value)].slice(0, 4);
                  setRecentSearches(updated);
                  localStorage.setItem('recentSearches', JSON.stringify(updated));
                }
              }}
              placeholder="Search products..."
              className="search-input"
              autoFocus
            />
            {query && (
              <button 
                className="clear-btn"
                onClick={() => {
                  setQuery('');
                  onSearch('');
                }}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Results */}
        <div className="search-results">
          {searchResults.loading ? (
            <div className="loading-state">
              <i className="fas fa-spinner fa-spin spinner"></i>
            </div>
          ) : query.length > 0 ? (
            <>
              {searchResults.results.length > 0 ? (
                <>
                  <div className="results-header">
                    <span className="results-count">
                      {searchResults.results.length} results
                    </span>
                  </div>
                  <div className="results-list">
                    {searchResults.results.map((result) => (
                      <Link
                        key={result.id}
                        to={result.url}
                        className="result-item"
                        onClick={onClose}
                      >
                        <div className="result-image">
                          <img src={result.image} alt={result.name} />
                        </div>
                        <div className="result-content">
                          <div className="result-header">
                            <h4 className="result-name">{result.name}</h4>
                            <span className="result-price">
                              R{result.price.toFixed(2)}
                            </span>
                          </div>
                          <div className="result-meta">
                            <span className="result-category">
                              {result.category}
                            </span>
                            <span className="result-type">
                              {result.subcategory}
                            </span>
                          </div>
                        </div>
                        <i className="fas fa-chevron-right chevron-icon"></i>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <div className="empty-state">
                  <i className="fas fa-search empty-icon"></i>
                  <p className="empty-text">No results found</p>
                  {recentSearches.length > 0 && (
                    <div className="suggestions">
                      <p className="suggestions-title">Try recent searches:</p>
                      <div className="suggestions-tags">
                        {recentSearches.map((search, index) => (
                          <button
                            key={index}
                            className="suggestion-tag"
                            onClick={() => handleSuggestionClick(search)}
                          >
                            {search}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="initial-state">
              {recentSearches.length > 0 ? (
                <div className="recent-section">
                  <div className="recent-header">
                    <span className="recent-title">Recent searches</span>
                    <button 
                      className="clear-recent-btn"
                      onClick={clearRecentSearches}
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="recent-list">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        className="recent-item"
                        onClick={() => handleSuggestionClick(search)}
                      >
                        <i className="fas fa-search recent-icon"></i>
                        <span className="recent-text">{search}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="empty-state">
                  <i className="fas fa-search empty-icon"></i>
                  <p className="empty-text">Search for products</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;