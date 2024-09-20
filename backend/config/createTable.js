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

const dynamodb = new AWS.DynamoDB();

const params = {
  TableName: 'FiloTableMVP1', // Replace with your table name
  AttributeDefinitions: [
    { AttributeName: 'PK', AttributeType: 'S' },
    { AttributeName: 'SK', AttributeType: 'S' },
    { AttributeName: 'email', AttributeType: 'S' },
  ],
  KeySchema: [
    { AttributeName: 'PK', KeyType: 'HASH' }, // Partition Key
    { AttributeName: 'SK', KeyType: 'RANGE' }, // Sort Key
  ],
  BillingMode: 'PAY_PER_REQUEST', // On-Demand Capacity Mode
  GlobalSecondaryIndexes: [
    {
      IndexName: 'GSI1',
      KeySchema: [
        { AttributeName: 'email', KeyType: 'HASH' }, // GSI Partition Key
        { AttributeName: 'PK', KeyType: 'RANGE' },   // GSI Sort Key
      ],
      Projection: {
        ProjectionType: 'ALL',
      },
    },
  ],
};

dynamodb.createTable(params, (err, data) => {
  if (err) {
    console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
  }
});