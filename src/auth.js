const jwt = require('jsonwebtoken');

const generateApiKey = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30s' });
};

const verifyApiKey = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = { generateApiKey, verifyApiKey };

const UserSchema = new mongoose.Schema({
  email: String,
  apiKey: String,
  lastRegen: Date,
  regenInterval: { type: Number, default: 30 }, // Seconds
});
