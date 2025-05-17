const express = require('express');
const router = express.Router();
const { generateApiKey } = require('../auth');
const { User } = require('../models');
const mongoose = require('mongoose');

router.post('/', async (req, res) => {
  const { email, scope = 'full' } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });
  const newKey = { key: generateApiKey(new mongoose.Types.ObjectId()), scope, lastRegen: new Date(), regenInterval: 30 };
  user.keys.push(newKey);
  await user.save();
  res.json(newKey);
});

module.exports = router;
