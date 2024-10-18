import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'; // Correct package for DynamoDBClient
import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv'; // Package that loads environment variables from a .env file into process.env

// Load environment variables (optional if you're using Lambda's environment variables)
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config({ path: '.env.development' });
}

// Create the DynamoDB client without credentials (use Lambda IAM Role)
const dbClient = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',  // Use default region if not provided
});

// Create the S3 client without credentials (use Lambda IAM Role)
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
});

// Create the DynamoDB Document client using the DynamoDB client
const ddbDocClient = DynamoDBDocumentClient.from(dbClient);

export default ddbDocClient;
