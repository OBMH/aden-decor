import serverless from "serverless-http";
import app from "../../server";

export const handler = serverless(app, {
  request(req: any) {
    if (req.url && req.url.startsWith('/.netlify/functions/api')) {
      req.url = req.url.replace('/.netlify/functions/api', '/api');
    } else if (req.url && !req.url.startsWith('/api')) {
      req.url = '/api' + req.url;
    }
  }
});
