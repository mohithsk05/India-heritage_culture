import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './States.css';

const regions = ['All', 'North India', 'South India', 'East India', 'West India', 'North East India', 'Central India', 'North West India'];

const States = () => {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/states')
      .then(res => setStates(res.data.states))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = states.filter(s => {
    const matchRegion = filter === 'All' || s.region === filter;
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                        s.capital.toLowerCase().includes(search.toLowerCase());
    return matchRegion && matchSearch;
  });

  if (loading) return (
    <div className="states-page">
      <div className="loading-container">
        <div className="spinner" />
        <p style={{ color: 'var(--gold)', fontFamily: 'var(--font-heading)' }}>
          Unveiling the states of Bharat...
        </p>
      </div>
    </div>
  );

  return (
    <div className="states-page">
      {/* Header */}
      <div className="states-header">
        <div className="states-header-bg" />
        <div className="states-header-content">
          <div className="eyebrow">🗺️ Explore</div>
          <h1 className="states-title">States of India</h1>
          <p className="states-subtitle">
            From the snow-capped Himalayas to the tropical coast — 28 states, 8 union territories,
            infinite stories waiting to be discovered.
          </p>
        </div>
      </div>

      <div className="states-body">
        {/* Search & Filter */}
        <div className="states-controls">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search states or capitals..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="states-search"
            />
          </div>
          <div className="region-filters">
            {regions.map(r => (
              <button
                key={r}
                className={`region-btn ${filter === r ? 'active' : ''}`}
                onClick={() => setFilter(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <div className="states-count">
          Showing <strong>{filtered.length}</strong> states
          {filter !== 'All' && <> in <strong>{filter}</strong></>}
        </div>

        {/* States Grid */}
        <div className="states-grid">
          {filtered.map((state, i) => (
            <div
              key={state.id}
              className="state-card"
              onClick={() => navigate(`/states/${state.id}`)}
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <div className="state-card-bg" style={{ background: state.color }} />
              <div className="state-card-content">
                <div className="state-emoji">{state.emoji}</div>
                <div className="state-region-badge">{state.region}</div>
                <h3 className="state-name">{state.name}</h3>
                <p className="state-capital">🏛️ {state.capital}</p>
                <p className="state-tagline">{state.tagline}</p>
                <div className="state-explore-btn">
                  Explore →
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="no-results">
            <div style={{ fontSize: '3rem' }}>🔍</div>
            <h3>No states found</h3>
            <p>Try a different search term or region filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default States;
