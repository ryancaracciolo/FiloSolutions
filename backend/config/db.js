import AWS from 'aws-sdk'; 
import dotenv from 'dotenv'; // package that loads environment variables from a .env file into process.env. (purpose is to keep sensitive data like API keys, passwords, etc. out of the codebase)

dotenv.config();

// Validate if environment variables are loaded
if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  console.error('AWS credentials are missing. Please check your .env file.');
  process.exit(1);  // Exit the app if credentials are missing
}

// Initialize AWS SDK with credentials and region
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dbClient = new AWS.DynamoDB.DocumentClient();

export default dbClient;

