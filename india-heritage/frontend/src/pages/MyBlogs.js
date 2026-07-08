import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './MyBlogs.css';

const MyBlogs = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    fetchMyBlogs();
  }, [user]);

  const fetchMyBlogs = async () => {
    try {
      const res = await axios.get('/api/blogs/my-blogs');
      setBlogs(res.data.blogs);
    } catch { toast.error('Failed to fetch your blogs'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    try {
      await axios.delete(`/api/blogs/${id}`);
      setBlogs(b => b.filter(blog => blog._id !== id));
      toast.success('Blog deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const handleTogglePublish = async (blog) => {
    const newStatus = blog.status === 'published' ? 'draft' : 'published';
    try {
      await axios.put(`/api/blogs/${blog._id}`, { status: newStatus });
      setBlogs(b => b.map(bl => bl._id === blog._id ? { ...bl, status: newStatus } : bl));
      toast.success(newStatus === 'published' ? '🚀 Blog published!' : '📝 Moved to drafts');
    } catch { toast.error('Failed to update'); }
  };

  const published = blogs.filter(b => b.status === 'published');
  const drafts = blogs.filter(b => b.status === 'draft');

  if (loading) return (
    <div className="my-blogs-page">
      <div className="loading-container">
        <div className="spinner" />
      </div>
    </div>
  );

  return (
    <div className="my-blogs-page">
      <div className="my-blogs-header">
        <div className="my-blogs-header-bg" />
        <div className="my-blogs-header-content">
          <div className="author-welcome">
            <div className="author-big-avatar">{user?.name?.[0]}</div>
            <div>
              <h1>My Stories</h1>
              <p className="author-email">{user?.email}</p>
            </div>
          </div>
          <div className="my-blogs-stats">
            <div className="my-stat">
              <span className="my-stat-num">{blogs.length}</span>
              <span className="my-stat-label">Total</span>
            </div>
            <div className="my-stat">
              <span className="my-stat-num">{published.length}</span>
              <span className="my-stat-label">Published</span>
            </div>
            <div className="my-stat">
              <span className="my-stat-num">{drafts.length}</span>
              <span className="my-stat-label">Drafts</span>
            </div>
          </div>
          <Link to="/blog/write" className="btn btn-gold">✍️ Write New Blog</Link>
        </div>
      </div>

      <div className="my-blogs-body container">
        {blogs.length === 0 ? (
          <div className="my-blogs-empty">
            <div style={{ fontSize: '4rem' }}>📜</div>
            <h2>No blogs yet</h2>
            <p>Start sharing your experience with India's incredible culture!</p>
            <Link to="/blog/write" className="btn btn-saffron" style={{ marginTop: '16px' }}>
              ✍️ Write Your First Blog
            </Link>
          </div>
        ) : (
          <>
            {published.length > 0 && (
              <div className="blogs-section">
                <h2 className="blogs-section-title">
                  <span className="section-dot published-dot" />
                  Published ({published.length})
                </h2>
                <div className="my-blogs-list">
                  {published.map(blog => (
                    <BlogRow
                      key={blog._id}
                      blog={blog}
                      onDelete={handleDelete}
                      onToggle={handleTogglePublish}
                    />
                  ))}
                </div>
              </div>
            )}

            {drafts.length > 0 && (
              <div className="blogs-section">
                <h2 className="blogs-section-title">
                  <span className="section-dot draft-dot" />
                  Drafts ({drafts.length})
                </h2>
                <div className="my-blogs-list">
                  {drafts.map(blog => (
                    <BlogRow
                      key={blog._id}
                      blog={blog}
                      onDelete={handleDelete}
                      onToggle={handleTogglePublish}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const BlogRow = ({ blog, onDelete, onToggle }) => (
  <div className="blog-row">
    <div className="blog-row-image">
      {blog.coverImage
        ? <img src={blog.coverImage} alt={blog.title} />
        : <div className="blog-row-placeholder">📜</div>
      }
    </div>
    <div className="blog-row-info">
      <div className="blog-row-meta">
        <span className={`badge badge-${blog.status === 'published' ? 'published' : 'draft'}`}>
          {blog.status}
        </span>
        <span className="badge badge-gold">{blog.category}</span>
      </div>
      <h3 className="blog-row-title">{blog.title}</h3>
      <p className="blog-row-excerpt">
        {blog.excerpt || blog.content?.replace(/<[^>]+>/g, '').substring(0, 100) + '...'}
      </p>
      <div className="blog-row-stats">
        <span>👁 {blog.views} views</span>
        <span>❤️ {blog.likes?.length || 0} likes</span>
        <span>📅 {new Date(blog.createdAt).toLocaleDateString('en-IN')}</span>
      </div>
    </div>
    <div className="blog-row-actions">
      <Link to={`/blog/${blog._id}`} className="btn btn-outline action-btn">👁 View</Link>
      <Link to={`/blog/edit/${blog._id}`} className="btn btn-gold action-btn">✏️ Edit</Link>
      <button
        className="btn btn-saffron action-btn"
        onClick={() => onToggle(blog)}
      >
        {blog.status === 'published' ? '⬇️ Unpublish' : '🚀 Publish'}
      </button>
      <button
        className="btn btn-danger action-btn"
        onClick={() => onDelete(blog._id, blog.title)}
      >
        🗑️ Delete
      </button>
    </div>
  </div>
);

export default MyBlogs;
