const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: String,
  apiKey: String,
  lastRegen: Date,
});

const UsageMetricSchema = new mongoose.Schema({
  apiKey: String,
  requests: Number,
  latency: Number,
  errors: Number,
  timestamp: Date,
});

const ApiListingSchema = new mongoose.Schema({
  name: String,
  provider: String,
  authType: String,
  performance: Number,
  reviews: [{ user: String, rating: Number, comment: String }],
  endpoint: String,
});

const TestKeySchema = new mongoose.Schema({
  apiKey: String,
  expiresAt: Date,
  usageLimit: Number,
  used: Number,
  sandboxId: String,
});

const GeneratedApiSchema = new mongoose.Schema({
  prompt: String,
  endpoint: String,
  code: String,
  status: String,
  createdAt: Date,
});

module.exports = {
  User: mongoose.model('User', UserSchema),
  UsageMetric: mongoose.model('UsageMetric', UsageMetricSchema),
  ApiListing: mongoose.model('ApiListing', ApiListingSchema),
  TestKey: mongoose.model('TestKey', TestKeySchema),
  GeneratedApi: mongoose.model('GeneratedApi', GeneratedApiSchema),
};
