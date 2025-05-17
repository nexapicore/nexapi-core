const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { TestKey } = require('../models');

router.post('/', async (req, res) => {
  const { apiKey, duration = 3600, usageLimit = 100 } = req.body;
  const testKey = jwt.sign({ apiKey, sandboxId: `sandbox_${Date.now()}` }, process.env.JWT_SECRET, { expiresIn: `${duration}s` });
  const record = new TestKey({ apiKey: testKey, expiresAt: new Date(Date.now() + duration * 1000), usageLimit, used: 0, sandboxId: `sandbox_${Date.now()}` });
  await record.save();
  res.json({ testKey, sandboxId: record.sandboxId });
});

router.post('/validate', async (req, res) => {
  const { testKey } = req.body;
  const record = await TestKey.findOne({ apiKey: testKey });
  if (!record || new Date() > record.expiresAt || record.used >= record.usageLimit) {
    return res.status(403).json({ error: 'Invalid or expired test key' });
  }
  record.used += 1;
  await record.save();
  res.json({ valid: true, sandboxId: record.sandboxId });
});

module.exports = router;
