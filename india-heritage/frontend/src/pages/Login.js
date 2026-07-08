import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './Auth.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.email || !form.password) { toast.error('Please fill all fields'); return; }
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      toast.success(`Welcome back, ${user.name}! 🙏`);
      navigate(user.role === 'admin' ? '/admin' : '/blog');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg" />
      <div className="auth-card">
        <div className="auth-logo">
          <span className="auth-flag">🇮🇳</span>
          <Link to="/" className="auth-site-name">भारत Heritage</Link>
        </div>

        <div className="auth-ornament">✦ ✧ ✦</div>

        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to share your story with India</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn btn-saffron auth-btn" disabled={loading}>
            {loading ? '⏳ Signing in...' : '🔑 Sign In'}
          </button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <div className="auth-demo">
          <p className="demo-label">Admin Demo Access</p>
          <button
            className="btn btn-gold demo-btn"
            onClick={() => {
              setForm({ email: 'admin@indiaheritage.com', password: 'Admin@123' });
              toast.success('Admin credentials filled!');
            }}
          >
            ⚙️ Use Admin Credentials
          </button>
        </div>

        <p className="auth-switch">
          New to India Heritage?{' '}
          <Link to="/register" className="auth-link">Create Account →</Link>
        </p>

        <Link to="/" className="back-home">← Back to Home</Link>
      </div>
    </div>
  );
};

export default Login;
