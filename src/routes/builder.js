const express = require('express');
const router = express.Router();
const axios = require('axios');
const mongoose = require('mongoose');
const { GeneratedApi } = require('../models');
const { generateApiKey } = require('../auth');

router.post('/', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt required' });
  let endpoint = `/api/${prompt.replace(/\s+/g, '-').toLowerCase()}`;
  let code = `
    const express = require('express');
    const router = express.Router();
    router.get('${endpoint}', (req, res) => {
      res.json({ message: 'Generated API for ${prompt}' });
    });
    module.exports = router;
  `;
  const api = new GeneratedApi({ prompt, endpoint, code, status: 'pending', createdAt: new Date() });
  await api.save();
  api.status = 'deployed';
  await api.save();
  res.json({ endpoint, apiKey: generateApiKey(api._id), sandboxId: `sandbox_${Date.now()}` });
});

router.get('/weather/:city', async (req, res) => {
  const { city } = req.params;
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

module.exports = router;
