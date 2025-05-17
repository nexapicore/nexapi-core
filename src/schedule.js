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

schedule.scheduleJob('*/5 * * * * *', async () => {
  const users = await User.find();
  const now = new Date();
  for (const user of users) {
    if (now - user.lastRegen >= user.regenInterval * 1000) {
      user.apiKey = generateApiKey(user._id);
      user.lastRegen = now;
      await user.save();
      console.log(`Regenerated API Key for ${user.email}`);
    }
  }
});


module.exports = { startRegeneration };
