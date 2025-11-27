// Export Express app directly for Vercel Node serverless runtime
// Vercel will invoke this function for any path rewritten to /api/index.js
const app = require('./server');

module.exports = app;
