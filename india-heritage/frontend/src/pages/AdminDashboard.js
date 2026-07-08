import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    if (!isAdmin) { toast.error('Admin access required'); navigate('/'); return; }
    fetchData();
  }, [user, isAdmin]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [blogsRes, usersRes] = await Promise.all([
        axios.get('/api/blogs/admin/all'),
        axios.get('/api/auth/users')
      ]);
      setBlogs(blogsRes.data.blogs);
      setUsers(usersRes.data.users);
    } catch (err) {
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (id, title) => {
    if (!window.confirm(`Delete blog: "${title}"?`)) return;
    try {
      await axios.delete(`/api/blogs/${id}`);
      setBlogs(b => b.filter(bl => bl._id !== id));
      toast.success('Blog deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const handleToggleBlogStatus = async (blog) => {
    const newStatus = blog.status === 'published' ? 'archived' : 'published';
    try {
      await axios.put(`/api/blogs/${blog._id}`, { status: newStatus });
      setBlogs(b => b.map(bl => bl._id === blog._id ? { ...bl, status: newStatus } : bl));
      toast.success(`Blog ${newStatus}`);
    } catch { toast.error('Failed to update'); }
  };

  const handleDeleteUser = async (id, name) => {
    if (!window.confirm(`Delete user "${name}"? This cannot be undone.`)) return;
    try {
      await axios.delete(`/api/auth/users/${id}`);
      setUsers(u => u.filter(usr => usr._id !== id));
      toast.success('User deleted');
    } catch { toast.error('Failed to delete user'); }
  };

  const stats = {
    totalBlogs: blogs.length,
    publishedBlogs: blogs.filter(b => b.status === 'published').length,
    draftBlogs: blogs.filter(b => b.status === 'draft').length,
    totalUsers: users.length,
    adminUsers: users.filter(u => u.role === 'admin').length,
    totalViews: blogs.reduce((acc, b) => acc + (b.views || 0), 0),
    totalLikes: blogs.reduce((acc, b) => acc + (b.likes?.length || 0), 0),
  };

  if (loading) return (
    <div className="admin-page">
      <div className="loading-container">
        <div className="spinner" />
        <p style={{ color: 'var(--gold)' }}>Loading admin panel...</p>
      </div>
    </div>
  );

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-header">
        <div className="admin-header-bg" />
        <div className="admin-header-content">
          <div className="admin-title-row">
            <div>
              <span className="admin-eyebrow">⚙️ Administration</span>
              <h1 className="admin-title">Admin Dashboard</h1>
              <p className="admin-sub">Manage blogs, users, and content for India Heritage</p>
            </div>
            <div className="admin-badge">
              <span>🛡️</span>
              <span>{user?.name}</span>
              <span className="admin-role-badge">ADMIN</span>
            </div>
          </div>

          {/* Stats row */}
          <div className="admin-stats">
            {[
              { icon: '📝', num: stats.totalBlogs, label: 'Total Blogs' },
              { icon: '🚀', num: stats.publishedBlogs, label: 'Published' },
              { icon: '📋', num: stats.draftBlogs, label: 'Drafts' },
              { icon: '👥', num: stats.totalUsers, label: 'Users' },
              { icon: '👁', num: stats.totalViews.toLocaleString(), label: 'Total Views' },
              { icon: '❤️', num: stats.totalLikes, label: 'Total Likes' },
            ].map((s, i) => (
              <div key={i} className="admin-stat-card">
                <span className="admin-stat-icon">{s.icon}</span>
                <span className="admin-stat-num">{s.num}</span>
                <span className="admin-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-tabs-wrapper">
        <div className="admin-tabs container">
          {['overview', 'blogs', 'users'].map(tab => (
            <button
              key={tab}
              className={`admin-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'overview' && '📊'} {tab === 'blogs' && '📝'} {tab === 'users' && '👥'}
              {' '}{tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="admin-body container">

        {activeTab === 'overview' && (
          <div className="admin-overview">
            <div className="overview-panels">
              <div className="overview-panel">
                <h2 className="panel-title">📝 Recent Blogs</h2>
                <div className="admin-mini-list">
                  {blogs.slice(0, 5).map(b => (
                    <div key={b._id} className="admin-mini-item">
                      <div className="admin-mini-info">
                        <span className="admin-mini-title">{b.title}</span>
                        <span className="admin-mini-meta">{b.author?.name} · {new Date(b.createdAt).toLocaleDateString('en-IN')}</span>
                      </div>
                      <span className={`badge badge-${b.status === 'published' ? 'published' : 'draft'}`}>{b.status}</span>
                    </div>
                  ))}
                </div>
                <button className="panel-see-all" onClick={() => setActiveTab('blogs')}>See all blogs →</button>
              </div>

              <div className="overview-panel">
                <h2 className="panel-title">👥 Recent Users</h2>
                <div className="admin-mini-list">
                  {users.slice(0, 5).map(u => (
                    <div key={u._id} className="admin-mini-item">
                      <div className="admin-mini-info">
                        <span className="admin-mini-title">{u.name}</span>
                        <span className="admin-mini-meta">{u.email}</span>
                      </div>
                      <span className={`badge badge-${u.role === 'admin' ? 'saffron' : 'gold'}`}>{u.role}</span>
                    </div>
                  ))}
                </div>
                <button className="panel-see-all" onClick={() => setActiveTab('users')}>See all users →</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'blogs' && (
          <div className="admin-blogs">
            <div className="admin-section-header">
              <h2>All Blogs ({blogs.length})</h2>
              <Link to="/blog/write" className="btn btn-saffron">+ New Blog</Link>
            </div>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Views</th>
                    <th>Likes</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map(blog => (
                    <tr key={blog._id}>
                      <td className="blog-title-cell">
                        <Link to={`/blog/${blog._id}`} className="admin-link">{blog.title}</Link>
                      </td>
                      <td>{blog.author?.name || 'Unknown'}</td>
                      <td><span className="badge badge-gold">{blog.category}</span></td>
                      <td>
                        <span className={`badge badge-${blog.status === 'published' ? 'published' : 'draft'}`}>
                          {blog.status}
                        </span>
                      </td>
                      <td>👁 {blog.views}</td>
                      <td>❤️ {blog.likes?.length || 0}</td>
                      <td>{new Date(blog.createdAt).toLocaleDateString('en-IN')}</td>
                      <td>
                        <div className="table-actions">
                          <Link to={`/blog/edit/${blog._id}`} className="table-btn edit">✏️</Link>
                          <button
                            className="table-btn toggle"
                            title={blog.status === 'published' ? 'Archive' : 'Publish'}
                            onClick={() => handleToggleBlogStatus(blog)}
                          >
                            {blog.status === 'published' ? '⬇️' : '🚀'}
                          </button>
                          <button
                            className="table-btn delete"
                            onClick={() => handleDeleteBlog(blog._id, blog.title)}
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="admin-users">
            <div className="admin-section-header">
              <h2>All Users ({users.length})</h2>
            </div>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u._id}>
                      <td>
                        <div className="user-cell">
                          <div className="user-cell-avatar">{u.name[0]}</div>
                          {u.name}
                        </div>
                      </td>
                      <td>{u.email}</td>
                      <td>
                        <span className={`badge badge-${u.role === 'admin' ? 'saffron' : 'gold'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td>{new Date(u.createdAt).toLocaleDateString('en-IN')}</td>
                      <td>
                        {u.role !== 'admin' && (
                          <button
                            className="table-btn delete"
                            onClick={() => handleDeleteUser(u._id, u.name)}
                          >
                            🗑️ Delete
                          </button>
                        )}
                        {u.role === 'admin' && (
                          <span style={{ color: 'var(--saffron)', fontSize: '0.8rem' }}>Protected</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
