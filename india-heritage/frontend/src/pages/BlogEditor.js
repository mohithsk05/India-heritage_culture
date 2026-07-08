import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './BlogEditor.css';

const categories = ['culture', 'heritage', 'festivals', 'art', 'cuisine', 'travel', 'history', 'general'];

const BlogEditor = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [form, setForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'general',
    tags: '',
    status: 'draft'
  });
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState('');
  const [extraImages, setExtraImages] = useState([]);
  const [extraPreviews, setExtraPreviews] = useState([]);
  const [videos, setVideos] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);
  const [wordCount, setWordCount] = useState(0);
  const coverRef = useRef();
  const imagesRef = useRef();
  const videosRef = useRef();

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    if (isEditing) {
      axios.get(`/api/blogs/${id}`)
        .then(res => {
          const b = res.data.blog;
          setForm({
            title: b.title || '',
            content: b.content || '',
            excerpt: b.excerpt || '',
            category: b.category || 'general',
            tags: b.tags?.join(', ') || '',
            status: b.status || 'draft'
          });
          if (b.coverImage) setCoverPreview(b.coverImage);
          if (b.images?.length) setExtraPreviews(b.images);
        })
        .catch(() => toast.error('Could not load blog'))
        .finally(() => setFetchLoading(false));
    }
  }, [id, user, isEditing, navigate]);

  useEffect(() => {
    const text = form.content.replace(/<[^>]+>/g, '');
    setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
  }, [form.content]);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCoverImage(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleExtraImages = (e) => {
    const files = Array.from(e.target.files);
    setExtraImages(files);
    setExtraPreviews(files.map(f => URL.createObjectURL(f)));
  };

  const handleVideos = (e) => {
    const files = Array.from(e.target.files);
    setVideos(files);
    setVideoPreviews(files.map(f => URL.createObjectURL(f)));
  };

  const handleSubmit = async (status) => {
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    if (!form.content.trim()) { toast.error('Content is required'); return; }

    setLoading(true);
    const formData = new FormData();
    Object.entries({ ...form, status }).forEach(([k, v]) => formData.append(k, v));
    if (coverImage) formData.append('coverImage', coverImage);
    extraImages.forEach(img => formData.append('images', img));
    videos.forEach(vid => formData.append('videos', vid));

    try {
      if (isEditing) {
        await axios.put(`/api/blogs/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Blog updated successfully! ✨');
        navigate(`/blog/${id}`);
      } else {
        const res = await axios.post('/api/blogs', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success(status === 'published' ? 'Blog published! 🎉' : 'Draft saved 📝');
        navigate(`/blog/${res.data.blog._id}`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save blog');
    } finally {
      setLoading(false);
    }
  };

  // Simple rich text formatting
  const formatText = (tag) => {
    const textarea = document.getElementById('content-editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = form.content.substring(start, end);
    const before = form.content.substring(0, start);
    const after = form.content.substring(end);

    let formatted = '';
    if (tag === 'bold') formatted = `<strong>${selected}</strong>`;
    else if (tag === 'italic') formatted = `<em>${selected}</em>`;
    else if (tag === 'h2') formatted = `<h2>${selected}</h2>`;
    else if (tag === 'h3') formatted = `<h3>${selected}</h3>`;
    else if (tag === 'quote') formatted = `<blockquote>${selected}</blockquote>`;
    else if (tag === 'ul') formatted = `<ul>\n  <li>${selected}</li>\n</ul>`;

    setForm(f => ({ ...f, content: before + formatted + after }));
  };

  if (fetchLoading) return (
    <div className="editor-page">
      <div className="loading-container">
        <div className="spinner" />
        <p style={{ color: 'var(--saffron)' }}>Loading blog...</p>
      </div>
    </div>
  );

  return (
    <div className="editor-page">
      <div className="editor-header">
        <div className="editor-header-bg" />
        <div className="editor-header-content">
          <h1>{isEditing ? '✏️ Edit Blog' : '✍️ Write Your Story'}</h1>
          <p>Share your experience with India's incredible culture and heritage</p>
        </div>
      </div>

      <div className="editor-body">
        <div className="editor-container">
          {/* Cover Image */}
          <div className="editor-section">
            <label className="editor-label">📸 Cover Image</label>
            <div
              className="cover-upload-zone"
              onClick={() => coverRef.current.click()}
              style={coverPreview ? { backgroundImage: `url(${coverPreview})` } : {}}
            >
              {!coverPreview && (
                <div className="upload-placeholder">
                  <span>🖼️</span>
                  <p>Click to upload cover image</p>
                  <small>JPG, PNG, WebP — max 10MB</small>
                </div>
              )}
              {coverPreview && <div className="cover-overlay-edit">📷 Change Cover</div>}
            </div>
            <input
              ref={coverRef}
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              style={{ display: 'none' }}
            />
          </div>

          {/* Title */}
          <div className="editor-section">
            <label className="editor-label">📌 Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Give your blog an inspiring title..."
              className="editor-input editor-title-input"
              maxLength={150}
            />
            <small className="char-count">{form.title.length}/150</small>
          </div>

          {/* Category & Tags */}
          <div className="editor-row">
            <div className="editor-section">
              <label className="editor-label">🏷️ Category</label>
              <select name="category" value={form.category} onChange={handleChange} className="editor-input">
                {categories.map(c => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>
            </div>
            <div className="editor-section">
              <label className="editor-label">🔖 Tags (comma separated)</label>
              <input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="e.g. rajasthan, heritage, forts"
                className="editor-input"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div className="editor-section">
            <label className="editor-label">📋 Short Description (Excerpt)</label>
            <textarea
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              placeholder="A brief summary shown in blog listing..."
              className="editor-input"
              rows={2}
              maxLength={300}
            />
            <small className="char-count">{form.excerpt.length}/300</small>
          </div>

          {/* Content Toolbar */}
          <div className="editor-section">
            <label className="editor-label">✍️ Content * <span className="word-count">{wordCount} words</span></label>
            <div className="editor-toolbar">
              <button type="button" title="Bold" onClick={() => formatText('bold')}><strong>B</strong></button>
              <button type="button" title="Italic" onClick={() => formatText('italic')}><em>I</em></button>
              <button type="button" title="Heading 2" onClick={() => formatText('h2')}>H2</button>
              <button type="button" title="Heading 3" onClick={() => formatText('h3')}>H3</button>
              <button type="button" title="Blockquote" onClick={() => formatText('quote')}>"</button>
              <button type="button" title="List" onClick={() => formatText('ul')}>≡</button>
              <span className="toolbar-hint">Select text, then click format</span>
            </div>
            <textarea
              id="content-editor"
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Write your story here... You can use HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;blockquote&gt; for rich formatting."
              className="editor-input content-textarea"
              rows={20}
            />
          </div>

          {/* Extra Images */}
          <div className="editor-section">
            <label className="editor-label">🖼️ Additional Images (up to 10)</label>
            <div className="file-upload-area" onClick={() => imagesRef.current.click()}>
              <span>📁</span>
              <p>Click to add more images to your gallery</p>
              <small>JPG, PNG, WebP — max 10 files</small>
            </div>
            <input
              ref={imagesRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleExtraImages}
              style={{ display: 'none' }}
            />
            {extraPreviews.length > 0 && (
              <div className="preview-grid">
                {extraPreviews.map((src, i) => (
                  <div key={i} className="preview-item">
                    <img src={src} alt={`Preview ${i + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Videos */}
          <div className="editor-section">
            <label className="editor-label">🎥 Videos (up to 3)</label>
            <div className="file-upload-area" onClick={() => videosRef.current.click()}>
              <span>🎬</span>
              <p>Click to upload videos</p>
              <small>MP4, MOV, AVI — max 3 files, 50MB each</small>
            </div>
            <input
              ref={videosRef}
              type="file"
              accept="video/*"
              multiple
              onChange={handleVideos}
              style={{ display: 'none' }}
            />
            {videoPreviews.length > 0 && (
              <div className="video-previews">
                {videoPreviews.map((src, i) => (
                  <video key={i} src={src} controls className="video-preview" />
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="divider"><span>✦</span></div>

          {/* Submit Buttons */}
          <div className="editor-actions">
            <button
              className="btn btn-outline"
              onClick={() => navigate(-1)}
              disabled={loading}
              type="button"
            >
              ← Cancel
            </button>
            <div className="submit-group">
              <button
                className="btn btn-gold"
                onClick={() => handleSubmit('draft')}
                disabled={loading}
                type="button"
              >
                {loading ? '⏳ Saving...' : '💾 Save as Draft'}
              </button>
              <button
                className="btn btn-saffron publish-btn"
                onClick={() => handleSubmit('published')}
                disabled={loading}
                type="button"
              >
                {loading ? '⏳ Publishing...' : '🚀 Publish Blog'}
              </button>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        {form.content && (
          <div className="content-preview">
            <h3 className="preview-title">📖 Content Preview</h3>
            <div
              className="preview-body"
              dangerouslySetInnerHTML={{ __html: form.content }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogEditor;
