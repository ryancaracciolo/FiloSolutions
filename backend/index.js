// Importing modules with ES6 syntax
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Load environment variables
dotenv.config();

// Initialize AWS SDK
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = 'FiloDBTable';
const PORT = process.env.PORT || 3001;

// Define routes for interacting with DynamoDB
app.post('/add-item', (req, res) => {
  const params = {
    TableName: tableName,
    Item: {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
    },
  };

  dynamodb.put(params, (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Could not add item' });
    } else {
      res.json({ success: 'Item added', data });
    }
  });
});

app.get('/get-items', (req, res) => {
  const params = {
    TableName: tableName,
  };

  dynamodb.scan(params, (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Could not retrieve items' });
    } else {
      res.json({ items: data.Items });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
