const { generateApiKey } = require('../src/auth');

test('generates valid JWT', () => {
  process.env.JWT_SECRET = 'test-secret';
  const token = generateApiKey('user123');
  expect(token).toMatch(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/);
});
