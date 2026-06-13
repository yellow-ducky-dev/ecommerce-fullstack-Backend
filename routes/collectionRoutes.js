const express = require('express');
const router  = express.Router();
const Product = require('../models/Product');

// @route   GET /api/collections
// @desc    Get all categories with product counts and a sample image
router.get('/', async (req, res) => {
  try {
    const categories = await Product.distinct('category');

    const collections = await Promise.all(
      categories.map(async (category) => {
        const count = await Product.countDocuments({ category });

        // grab first product image as cover
        const sample = await Product.findOne({ category })
          .select('image name')
          .lean();

        return {
          name:  category,
          count,
          cover: sample?.image || null,
        };
      })
    );

    // sort by product count descending
    collections.sort((a, b) => b.count - a.count);

    res.json({ collections, total: collections.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/collections/:category
// @desc    Get products for a specific category (with pagination + sort)
router.get('/:category', async (req, res) => {
  try {
    const { page = 1, limit = 20, sort } = req.query;
    const category = decodeURIComponent(req.params.category);

    const query = { category: { $regex: new RegExp(`^${category}$`, 'i') } };

    let sortOption = { createdAt: -1 };
    if (sort === 'price-asc')  sortOption = { price:  1 };
    if (sort === 'price-desc') sortOption = { price: -1 };
    if (sort === 'rating')     sortOption = { rating: -1 };
    if (sort === 'popular')    sortOption = { sold:   -1 };

    const pageNum  = Number(page);
    const limitNum = Number(limit);
    const skip     = (pageNum - 1) * limitNum;

    const total    = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum)
      .lean();

    res.json({
      category,
      products,
      page:  pageNum,
      pages: Math.ceil(total / limitNum),
      total,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;