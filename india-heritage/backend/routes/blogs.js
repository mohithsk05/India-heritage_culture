const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Blog = require('../models/Blog');
const { auth } = require('../middleware/auth');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|mp4|mov|avi/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    if (ext) cb(null, true);
    else cb(new Error('Only images and videos are allowed'));
  }
});

// Get all published blogs (public)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    const filter = { status: 'published', isApproved: true };
    if (category && category !== 'all') filter.category = category;
    if (search) filter.$text = { $search: search };

    const blogs = await Blog.find(filter)
      .populate('author', 'name email avatar')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Blog.countDocuments(filter);
    res.json({ blogs, total, pages: Math.ceil(total / limit), currentPage: page });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Admin: get all blogs
router.get('/admin/all', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
    const blogs = await Blog.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
    res.json({ blogs });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's own blogs
router.get('/my-blogs', auth, async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id })
      .populate('author', 'name email avatar')
      .sort({ createdAt: -1 });
    res.json({ blogs });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single blog
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'name email avatar bio');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    blog.views += 1;
    await blog.save();
    res.json({ blog });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create blog
router.post('/', auth, upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'images', maxCount: 10 },
  { name: 'videos', maxCount: 3 }
]), async (req, res) => {
  try {
    const { title, content, excerpt, tags, category, status } = req.body;
    const blogData = {
      title, content, excerpt, category,
      author: req.user._id,
      status: status || 'draft',
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())) : []
    };

    if (req.files?.coverImage) {
      blogData.coverImage = `/uploads/${req.files.coverImage[0].filename}`;
    }
    if (req.files?.images) {
      blogData.images = req.files.images.map(f => `/uploads/${f.filename}`);
    }
    if (req.files?.videos) {
      blogData.videos = req.files.videos.map(f => `/uploads/${f.filename}`);
    }

    const blog = await Blog.create(blogData);
    await blog.populate('author', 'name email avatar');
    res.status(201).json({ blog, message: 'Blog created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update blog (owner or admin)
router.put('/:id', auth, upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'images', maxCount: 10 }
]), async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const isOwner = blog.author.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) return res.status(403).json({ message: 'Not authorized' });

    const { title, content, excerpt, tags, category, status } = req.body;
    if (title) blog.title = title;
    if (content) blog.content = content;
    if (excerpt) blog.excerpt = excerpt;
    if (category) blog.category = category;
    if (status) blog.status = status;
    if (tags) blog.tags = Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim());
    if (req.files?.coverImage) blog.coverImage = `/uploads/${req.files.coverImage[0].filename}`;
    if (req.files?.images) blog.images = [...(blog.images || []), ...req.files.images.map(f => `/uploads/${f.filename}`)];

    await blog.save();
    await blog.populate('author', 'name email avatar');
    res.json({ blog, message: 'Blog updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete blog (owner or admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const isOwner = blog.author.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) return res.status(403).json({ message: 'Not authorized' });

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle like
router.post('/:id/like', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const likedIndex = blog.likes.indexOf(req.user._id);
    if (likedIndex > -1) blog.likes.splice(likedIndex, 1);
    else blog.likes.push(req.user._id);

    await blog.save();
    res.json({ likes: blog.likes.length, liked: likedIndex === -1 });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
