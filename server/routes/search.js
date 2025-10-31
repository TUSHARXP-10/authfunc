const express = require('express');
const router = express.Router();
const SearchTerm = require('../models/SearchTerm');
const axios = require('axios');
const { createApi } = require('unsplash-js');

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

// @desc    Get top 5 search terms
// @route   GET /api/top-searches
router.get('/top-searches', async (req, res) => {
  try {
    const topSearches = await SearchTerm.find().sort({ count: -1 }).limit(5);
    res.json(topSearches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Search images from Unsplash and store search term
// @route   POST /api/search
router.post('/search', async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    // Update or create search term
    let searchTerm = await SearchTerm.findOne({ term: query.toLowerCase() });
    if (searchTerm) {
      searchTerm.count++;
    } else {
      searchTerm = new SearchTerm({ term: query.toLowerCase() });
    }
    await searchTerm.save();

    // Save search term to user's history if authenticated
    if (req.user) {
      const user = await User.findById(req.user.id);
      if (user) {
        user.searchHistory.unshift({ term: query.toLowerCase() });
        user.searchHistory = user.searchHistory.slice(0, 10); // Keep only the last 10 searches
        await user.save();
      }
    }

    // Call Unsplash API
    const unsplashResponse = await unsplash.search.getPhotos({
      query: query,
      page: 1,
      perPage: 10,
    });

    res.json(unsplashResponse.response.results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get user's search history
// @route   GET /api/history
router.get('/history', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.searchHistory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;