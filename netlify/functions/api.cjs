const serverless = require('serverless-http');
const server = require('../../api/server.bundle.cjs');
const app = server.default || server;
const handler = serverless(app);

module.exports.handler = async (event, context) => {
  // Normalize path so Express receives clean /api/* routing
  if (event.path && event.path.startsWith('/.netlify/functions/api')) {
    event.path = event.path.replace('/.netlify/functions/api', '/api');
  } else if (event.path && !event.path.startsWith('/api')) {
    event.path = '/api' + event.path;
  }
  return await handler(event, context);
};
