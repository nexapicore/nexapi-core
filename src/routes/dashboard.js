const express = require('express');
const router = express.Router();
const { UsageMetric } = require('../models');

router.post('/', async (req, res) => {
  const { apiKey, requests, latency, errors } = req.body;
  const metric = new UsageMetric({ apiKey, requests, latency, errors, timestamp: new Date() });
  await metric.save();
  res.sendStatus(201);
});

router.get('/:apiKey', async (req, res) => {
  const { apiKey } = req.params;
  const metrics = await UsageMetric.find({ apiKey }).sort({ timestamp: -1 }).limit(100);
  const suggestions = ['Switch to a cheaper plan to save $20/month', 'Enable caching for better performance'];
  res.json({ metrics, suggestions });
});

module.exports = router;
