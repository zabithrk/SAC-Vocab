const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

test('app exposes core learning interactions', () => {
  const app = fs.readFileSync('src/app.js', 'utf8');
  assert.match(app, /speechSynthesis/);
  assert.match(app, /startPractice/);
  assert.match(app, /ephemeral/);
});
