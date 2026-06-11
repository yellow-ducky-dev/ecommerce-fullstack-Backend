const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, min: 0 },
    image: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String, required: true },
    category: { type: String, required: true, trim: true },
    brand: { type: String, default: '' },
    stock: { type: Number, required: true, default: 0 },
    sold: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    reviews: [reviewSchema],
    featured: { type: Boolean, default: false },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

// Text index for search
productSchema.index({ name: 'text', description: 'text', category: 'text', brand: 'text' });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
