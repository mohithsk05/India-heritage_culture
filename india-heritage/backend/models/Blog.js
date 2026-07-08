const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  excerpt: { type: String, default: '' },
  coverImage: { type: String, default: '' },
  images: [{ type: String }],
  videos: [{ type: String }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [{ type: String }],
  category: {
    type: String,
    enum: ['culture', 'heritage', 'festivals', 'art', 'cuisine', 'travel', 'history', 'general'],
    default: 'general'
  },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  views: { type: Number, default: 0 },
  isApproved: { type: Boolean, default: true }
}, { timestamps: true });

blogSchema.index({ title: 'text', content: 'text', tags: 'text' });

module.exports = mongoose.model('Blog', blogSchema);
