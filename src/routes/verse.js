const express = require('express');
const router = express.Router();
const { ApiListing } = require('../models');

router.post('/', async (req, res) => {
  const { name, provider, authType, performance, endpoint } = req.body;
  const listing = new ApiListing({ name, provider, authType, performance, reviews: [], endpoint });
  await listing.save();
  res.json(listing);
});

router.get('/', async (req, res) => {
  const { authType, minPerformance } = req.query;
  let query = {};
  if (authType) query.authType = authType;
  if (minPerformance) query.performance = { $gte: parseInt(minPerformance) };
  const listings = await ApiListing.find(query);
  res.json(listings);
});

module.exports = router;
