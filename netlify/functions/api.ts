import serverless from "serverless-http";
import app from "../../server";

const serverlessApp = serverless(app);

export const handler = async (event: any, context: any) => {
  // Directly normalize event path before serverless-http processing
  if (event && event.path) {
    if (event.path.startsWith('/.netlify/functions/api')) {
      event.path = event.path.replace('/.netlify/functions/api', '/api');
    } else if (!event.path.startsWith('/api')) {
      event.path = '/api' + event.path;
    }
  }
  if (event && typeof event.rawUrl === 'string') {
    event.rawUrl = event.rawUrl.replace('/.netlify/functions/api', '/api');
  }
  return await serverlessApp(event, context);
};
