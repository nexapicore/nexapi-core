const express = require('express');
const router = express.Router();
const { generateApiKey } = require('../auth');
const { User } = require('../models');
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'Email required' });
  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ email, apiKey: generateApiKey(new mongoose.Types.ObjectId()), lastRegen: new Date() });
    await user.save();
  }
  res.json({ apiKey: user.apiKey, expiresAt: new Date(Date.now() + 30000) });
});

module.exports = router;
