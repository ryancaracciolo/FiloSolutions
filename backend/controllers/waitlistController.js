import dynamodb from '../config/db.js';
import shortUUID from "short-uuid";
import { PutCommand, GetCommand, QueryCommand, BatchGetCommand } from '@aws-sdk/lib-dynamodb';

const tableName = 'Waitlist'; // Name of the DynamoDB table

export const addToWaitlist = async (req, res) => {
    const { name, email } = req.body;
    console.log("EFAFDFSDFDSL");
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }
  
    const item = {
      PK: `USER#${email}`, // Partition Key to make sure each email is unique
      SK: 'METADATA', // Sort Key
      Name: name,
      Email: email,
      JoinedAt: new Date().toISOString(),
    };
  
    const params = {
      TableName: tableName,
      Item: item,
      ConditionExpression: 'attribute_not_exists(PK)', // Prevents overwriting existing items with the same PK
    };
  
    try {
      const command = new PutCommand(params);
      await dynamodb.send(command);
      console.log('Added:', JSON.stringify(item, null, 2));
      res.status(201).json({ message: 'Added to waitlist successfully.' });
    } catch (err) {
      if (err.name === 'ConditionalCheckFailedException') {
        res.status(409).json({ error: 'User already exists in the waitlist.' });
      } else {
        console.error('Unable to add. Error JSON:', JSON.stringify(err, null, 2));
        res.status(500).json({ error: 'An error occurred while adding to the waitlist.' });
      }
    }
};