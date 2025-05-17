const schedule = require('node-schedule');
const { generateApiKey } = require('./auth');
const { User } = require('./models');

const startRegeneration = () => {
  schedule.scheduleJob('*/30 * * * * *', async () => {
    const users = await User.find();
    for (const user of users) {
      user.apiKey = generateApiKey(user._id);
      user.lastRegen = new Date();
      await user.save();
      console.log(`Regenerated API Key for ${user.email} at ${user.lastRegen}`);
    }
  });
};

module.exports = { startRegeneration };
