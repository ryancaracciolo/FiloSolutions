import awsServerlessExpress from 'aws-serverless-express';
import index from './index.js';

const server = awsServerlessExpress.createServer(index);

export const handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
