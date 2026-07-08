import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`/api/blogs/${id}`)
      .then(res => {
        setBlog(res.data.blog);
        setLikesCount(res.data.blog.likes?.length || 0);
        if (user) setLiked(res.data.blog.likes?.includes(user.id));
      })
      .catch(() => toast.error('Blog not found'))
      .finally(() => setLoading(false));
  }, [id, user]);

  const handleLike = async () => {
    if (!user) { toast.error('Please login to like'); return; }
    try {
      const res = await axios.post(`/api/blogs/${id}/like`);
      setLiked(res.data.liked);
      setLikesCount(res.data.likes);
    } catch { toast.error('Failed to like'); }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      await axios.delete(`/api/blogs/${id}`);
      toast.success('Blog deleted successfully');
      navigate('/blog');
    } catch { toast.error('Failed to delete blog'); }
  };

  const isOwner = user && blog && (blog.author?._id === user.id || blog.author?._id === user._id);
  const isAdmin = user?.role === 'admin';

  if (loading) return (
    <div className="blog-detail-page">
      <div className="loading-container">
        <div className="spinner" />
        <p style={{ color: 'var(--saffron)', fontFamily: 'var(--font-heading)' }}>Loading story...</p>
      </div>
    </div>
  );

  if (!blog) return (
    <div className="blog-detail-page">
      <div className="loading-container">
        <h2>Blog not found</h2>
        <Link to="/blog" className="btn btn-saffron">← Back to Blogs</Link>
      </div>
    </div>
  );

  return (
    <div className="blog-detail-page">
      {/* Cover */}
      <div className="blog-detail-cover">
        {blog.coverImage ? (
          <img src={blog.coverImage} alt={blog.title} className="cover-img" />
        ) : (
          <div className="cover-placeholder" />
        )}
        <div className="cover-overlay" />
        <div className="cover-content">
          <Link to="/blog" className="back-link">← All Blogs</Link>
          <div className="blog-category-badge">{blog.category}</div>
          <h1 className="blog-detail-title">{blog.title}</h1>
          <div className="blog-detail-meta">
            <div className="author-info">
              <div className="author-avatar-lg">{blog.author?.name?.[0] || 'A'}</div>
              <div>
                <div className="author-name">{blog.author?.name}</div>
                <div className="blog-date">
                  {new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>
            </div>
            <div className="blog-detail-stats">
              <span>👁 {blog.views} views</span>
              <span>❤️ {likesCount} likes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="blog-detail-body">
        <div className="blog-detail-container">
          {/* Action bar */}
          <div className="blog-action-bar">
            <button
              className={`like-btn ${liked ? 'liked' : ''}`}
              onClick={handleLike}
            >
              {liked ? '❤️' : '🤍'} {likesCount} {likesCount === 1 ? 'Like' : 'Likes'}
            </button>

            {(isOwner || isAdmin) && (
              <div className="owner-actions">
                <Link to={`/blog/edit/${blog._id}`} className="btn btn-gold">
                  ✏️ Edit
                </Link>
                <button className="btn btn-danger" onClick={handleDelete}>
                  🗑️ Delete
                </button>
              </div>
            )}
          </div>

          {/* Tags */}
          {blog.tags?.length > 0 && (
            <div className="blog-tags">
              {blog.tags.map((tag, i) => (
                <span key={i} className="blog-tag">#{tag}</span>
              ))}
            </div>
          )}

          {/* Main Content */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Extra Images */}
          {blog.images?.length > 0 && (
            <div className="blog-gallery">
              <h3 className="gallery-title">📸 Photo Gallery</h3>
              <div className="gallery-grid">
                {blog.images.map((img, i) => (
                  <div className="gallery-item" key={i}>
                    <img src={img} alt={`Gallery ${i + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Videos */}
          {blog.videos?.length > 0 && (
            <div className="blog-videos">
              <h3 className="gallery-title">🎥 Videos</h3>
              <div className="videos-grid">
                {blog.videos.map((vid, i) => (
                  <video key={i} controls className="blog-video">
                    <source src={vid} />
                    Your browser does not support the video tag.
                  </video>
                ))}
              </div>
            </div>
          )}

          {/* Author card */}
          <div className="author-card">
            <div className="author-avatar-xl">{blog.author?.name?.[0] || 'A'}</div>
            <div className="author-card-info">
              <div className="author-card-name">{blog.author?.name}</div>
              <div className="author-card-email">{blog.author?.email}</div>
              {blog.author?.bio && <p className="author-card-bio">{blog.author.bio}</p>}
            </div>
          </div>

          <div className="blog-footer-nav">
            <Link to="/blog" className="btn btn-outline">← Back to All Blogs</Link>
            <Link to="/blog/write" className="btn btn-saffron">✍️ Write Your Story</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
