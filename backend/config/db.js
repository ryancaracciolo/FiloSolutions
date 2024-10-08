import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'; // Correct package for DynamoDBClient
import { S3Client } from '@aws-sdk/client-s3'
import dotenv from 'dotenv'; // Package that loads environment variables from a .env file into process.env

dotenv.config();

// Validate if environment variables are loaded
if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_REGION) {
  console.error('AWS credentials or region are missing. Please check your .env file.');
  process.exit(1); // Exit the app if credentials are missing
}

// Create the DynamoDB client with credentials and region
const dbClient = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Create the DynamoDB Document client using the DynamoDB client
const ddbDocClient = DynamoDBDocumentClient.from(dbClient);

export default ddbDocClient;
//export default s3Client;

