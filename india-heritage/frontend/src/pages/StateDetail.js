import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './StateDetail.css';

const tabs = ['Overview', 'Heritage', 'Culture', 'Festivals', 'Attractions', 'Cuisine'];

const StateDetail = () => {
  const { id } = useParams();
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`/api/states/${id}`)
      .then(res => setState(res.data.state))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="state-detail-page">
      <div className="loading-container">
        <div className="spinner" />
        <p style={{ color: 'var(--saffron)', fontFamily: 'var(--font-heading)' }}>
          Loading the wonders of this state...
        </p>
      </div>
    </div>
  );

  if (!state) return (
    <div className="state-detail-page">
      <div className="loading-container">
        <div style={{ fontSize: '3rem' }}>🏛️</div>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--deep-maroon)' }}>State not found</h2>
        <Link to="/states" className="btn btn-saffron">← Back to States</Link>
      </div>
    </div>
  );

  return (
    <div className="state-detail-page">
      {/* Hero Banner */}
      <div className="state-hero" style={{ background: `linear-gradient(160deg, #0D0500, ${state.color}88, #0D0500)` }}>
        <div className="state-hero-overlay" />
        <div className="state-hero-content">
          <Link to="/states" className="back-link">← All States</Link>
          <div className="state-hero-emoji">{state.emoji}</div>
          <h1 className="state-hero-name">{state.name}</h1>
          <p className="state-hero-tagline">{state.tagline}</p>
          <div className="state-meta">
            <div className="meta-item">
              <span className="meta-label">Capital</span>
              <span className="meta-value">🏛️ {state.capital}</span>
            </div>
            <div className="meta-divider" />
            <div className="meta-item">
              <span className="meta-label">Language</span>
              <span className="meta-value">🗣️ {state.language}</span>
            </div>
            <div className="meta-divider" />
            <div className="meta-item">
              <span className="meta-label">Region</span>
              <span className="meta-value">📍 {state.region}</span>
            </div>
            {state.population && (
              <>
                <div className="meta-divider" />
                <div className="meta-item">
                  <span className="meta-label">Population</span>
                  <span className="meta-value">👥 {state.population}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="state-tabs-wrapper">
        <div className="state-tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="state-content container">

        {activeTab === 'Overview' && (
          <div className="tab-panel">
            <div className="overview-grid">
              <div className="overview-main">
                <h2 className="section-title">About {state.name}</h2>
                <p className="state-desc">{state.description}</p>

                {state.established && (
                  <div className="info-box">
                    <span className="info-icon">📅</span>
                    <div>
                      <strong>Established:</strong> {state.established}
                    </div>
                  </div>
                )}
                {state.area && (
                  <div className="info-box">
                    <span className="info-icon">📐</span>
                    <div>
                      <strong>Area:</strong> {state.area}
                    </div>
                  </div>
                )}

                {/* Quick preview of other sections */}
                <h3 className="section-subtitle">Quick Highlights</h3>
                <div className="highlights-grid">
                  {state.attractions?.slice(0, 3).map((a, i) => (
                    <div className="highlight-card" key={i}>
                      <div className="highlight-type">{a.type}</div>
                      <div className="highlight-name">{a.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="overview-sidebar">
                <div className="sidebar-card">
                  <h3>🎪 Top Festivals</h3>
                  {state.festivals?.slice(0, 3).map((f, i) => (
                    <div className="sidebar-item" key={i}>
                      <strong>{f.name}</strong>
                      <span className="sidebar-detail">{f.month}</span>
                    </div>
                  ))}
                </div>

                <div className="sidebar-card">
                  <h3>🍛 Must-Try Dishes</h3>
                  <div className="cuisine-tags">
                    {state.cuisine?.map((c, i) => (
                      <span className="cuisine-tag" key={i}>{c}</span>
                    ))}
                  </div>
                </div>

                <div className="sidebar-card">
                  <h3>🎨 Art Forms</h3>
                  {state.culture?.artForms?.slice(0, 5).map((a, i) => (
                    <div className="sidebar-item" key={i}>{a}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Heritage' && (
          <div className="tab-panel">
            <h2 className="section-title">{state.heritage?.title}</h2>
            <p className="section-desc">{state.heritage?.content}</p>

            {state.heritage?.sites?.length > 0 && (
              <>
                <h3 className="section-subtitle">Heritage Sites</h3>
                <div className="sites-grid">
                  {state.heritage.sites.map((site, i) => (
                    <div className="site-card" key={i}>
                      <div className="site-number">{String(i + 1).padStart(2, '0')}</div>
                      <div className="site-name">{site}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'Culture' && (
          <div className="tab-panel">
            <h2 className="section-title">{state.culture?.title}</h2>
            <p className="section-desc">{state.culture?.content}</p>

            {state.culture?.artForms?.length > 0 && (
              <>
                <h3 className="section-subtitle">Art Forms & Traditions</h3>
                <div className="artforms-grid">
                  {state.culture.artForms.map((art, i) => (
                    <div className="artform-card" key={i}>
                      <div className="artform-icon">🎭</div>
                      <div className="artform-name">{art}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'Festivals' && (
          <div className="tab-panel">
            <h2 className="section-title">Festivals of {state.name}</h2>
            <p className="section-desc" style={{ marginBottom: '40px' }}>
              Experience the vibrant celebrations that bring the spirit of {state.name} alive.
            </p>
            <div className="festivals-list">
              {state.festivals?.map((fest, i) => (
                <div className="festival-card" key={i}>
                  <div className="festival-number">{String(i + 1).padStart(2, '0')}</div>
                  <div className="festival-info">
                    <div className="festival-header">
                      <h3 className="festival-name">{fest.name}</h3>
                      <span className="festival-month">📅 {fest.month}</span>
                    </div>
                    <p className="festival-desc">{fest.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Attractions' && (
          <div className="tab-panel">
            <h2 className="section-title">Places to Visit</h2>
            <div className="attractions-grid">
              {state.attractions?.map((place, i) => (
                <div className="attraction-card" key={i}>
                  <div className="attraction-type-badge">{place.type}</div>
                  <h3 className="attraction-name">{place.name}</h3>
                  <p className="attraction-desc">{place.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Cuisine' && (
          <div className="tab-panel">
            <h2 className="section-title">Cuisine of {state.name}</h2>
            <p className="section-desc" style={{ marginBottom: '40px' }}>
              Discover the flavors that define the culinary identity of this incredible state.
            </p>
            <div className="cuisine-grid">
              {state.cuisine?.map((dish, i) => (
                <div className="cuisine-card" key={i}>
                  <div className="cuisine-icon">🍽️</div>
                  <h3>{dish}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default StateDetail;
