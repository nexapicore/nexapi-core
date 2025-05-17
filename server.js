require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { startRegeneration } = require('./src/schedule');
const app = express();

app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

startRegeneration();

app.use('/api/key', require('./src/routes/api-key'));
app.use('/api/dashboard', require('./src/routes/dashboard'));
app.use('/api/verse', require('./src/routes/verse'));
app.use('/api/test-key', require('./src/routes/test-keys'));
app.use('/api/builder', require('./src/routes/builder'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
