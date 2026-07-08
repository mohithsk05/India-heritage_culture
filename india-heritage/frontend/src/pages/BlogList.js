import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './BlogList.css';

const categories = ['all', 'culture', 'heritage', 'festivals', 'art', 'cuisine', 'travel', 'history', 'general'];

const BlogList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBlogs();
  }, [category, page]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 9, category });
      const res = await axios.get(`/api/blogs?${params}`);
      setBlogs(res.data.blogs);
      setTotalPages(res.data.pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/blog?search=${search}`);
  };

  return (
    <div className="blog-list-page">
      {/* Header */}
      <div className="blog-header">
        <div className="blog-header-bg" />
        <div className="blog-header-content">
          <div className="eyebrow">✍️ Community</div>
          <h1 className="blog-title">Cultural Blog</h1>
          <p className="blog-subtitle">
            Stories, experiences, and reflections from India's cultural tapestry — written by explorers like you.
          </p>
          {user ? (
            <Link to="/blog/write" className="btn btn-gold blog-write-btn">
              ✍️ Write Your Story
            </Link>
          ) : (
            <Link to="/login" className="btn btn-gold blog-write-btn">
              🔑 Login to Write
            </Link>
          )}
        </div>
      </div>

      <div className="blog-body container">
        {/* Search */}
        <form className="blog-search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search blogs by title or topic..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="blog-search"
          />
          <button type="submit" className="btn btn-saffron">Search</button>
        </form>

        {/* Categories */}
        <div className="blog-categories">
          {categories.map(cat => (
            <button
              key={cat}
              className={`cat-btn ${category === cat ? 'active' : ''}`}
              onClick={() => { setCategory(cat); setPage(1); }}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="loading-container">
            <div className="spinner" />
            <p style={{ color: 'var(--saffron)', fontFamily: 'var(--font-heading)' }}>Loading stories...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="blog-empty">
            <div style={{ fontSize: '3rem' }}>📜</div>
            <h3>No blogs published yet</h3>
            <p>Be the first to share your story about India's incredible culture!</p>
            {user && <Link to="/blog/write" className="btn btn-saffron" style={{ marginTop: '16px' }}>Write First Blog</Link>}
          </div>
        ) : (
          <>
            <div className="blog-grid">
              {blogs.map((blog) => (
                <Link to={`/blog/${blog._id}`} key={blog._id} className="blog-card">
                  <div className="blog-card-image">
                    {blog.coverImage ? (
                      <img src={blog.coverImage} alt={blog.title} />
                    ) : (
                      <div className="blog-card-placeholder">
                        <span>📜</span>
                      </div>
                    )}
                    <span className="blog-card-category">{blog.category}</span>
                  </div>
                  <div className="blog-card-body">
                    <h3 className="blog-card-title">{blog.title}</h3>
                    <p className="blog-card-excerpt">
                      {blog.excerpt || blog.content.replace(/<[^>]+>/g, '').substring(0, 120) + '...'}
                    </p>
                    <div className="blog-card-meta">
                      <div className="blog-card-author">
                        <div className="author-avatar">{blog.author?.name?.[0] || 'A'}</div>
                        <span>{blog.author?.name}</span>
                      </div>
                      <div className="blog-card-stats">
                        <span>👁 {blog.views}</span>
                        <span>❤️ {blog.likes?.length || 0}</span>
                      </div>
                    </div>
                    <div className="blog-card-date">
                      {new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="page-btn"
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                >
                  ← Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    className={`page-btn ${page === p ? 'active' : ''}`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                ))}
                <button
                  className="page-btn"
                  disabled={page === totalPages}
                  onClick={() => setPage(p => p + 1)}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogList;
