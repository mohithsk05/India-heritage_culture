import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Namaste! See you soon 🙏');
    navigate('/');
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-symbol">🇮🇳</span>
          <div className="logo-text">
            <span className="logo-hindi">भारत</span>
            <span className="logo-en">Heritage</span>
          </div>
        </Link>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={menuOpen ? 'open' : ''}></span>
          <span className={menuOpen ? 'open' : ''}></span>
          <span className={menuOpen ? 'open' : ''}></span>
        </button>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/states" className={`nav-link ${isActive('/states') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
            🗺️ States
          </Link>
          <Link to="/blog" className={`nav-link ${isActive('/blog') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
            📝 Blog
          </Link>

          {user ? (
            <>
              <Link to="/my-blogs" className={`nav-link ${isActive('/my-blogs') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
                📚 My Blogs
              </Link>
              <Link to="/blog/write" className="btn btn-saffron nav-cta" onClick={() => setMenuOpen(false)}>
                ✍️ Write
              </Link>
              {isAdmin && (
                <Link to="/admin" className="nav-link admin-link" onClick={() => setMenuOpen(false)}>
                  ⚙️ Admin
                </Link>
              )}
              <div className="nav-user">
                <div className="user-avatar">{user.name[0].toUpperCase()}</div>
                <div className="user-dropdown">
                  <div className="user-name">{user.name}</div>
                  <div className="user-email">{user.email}</div>
                  <hr />
                  <button onClick={handleLogout} className="logout-btn">🚪 Logout</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline nav-cta" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="btn btn-gold nav-cta" onClick={() => setMenuOpen(false)}>Join</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
