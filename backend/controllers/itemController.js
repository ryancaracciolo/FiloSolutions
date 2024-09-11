import dynamodb from '../config/db.js';

const tableName = 'FiloDBTable'; // Name of the DynamoDB table

export const addItem = (req, res) => {
  const { id, name, description } = req.body;

  // Basic validation to ensure required fields are present
  if (!id || !name) {
    return res.status(400).json({ error: 'ID and Name are required' });
  }

  const params = {
    TableName: tableName,
    Item: { id, name, description },
  };

  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error('Error adding item:', JSON.stringify(err, null, 2));  // Log the detailed error
      return res.status(500).json({ error: 'Could not add item', details: err.message });
    }
    res.status(201).json({ success: 'Item added successfully', data });
  });
};

export const getItems = (req, res) => {
  const params = { TableName: tableName };

  dynamodb.scan(params, (err, data) => {
    if (err) {
      console.error('Error retrieving items:', JSON.stringify(err, null, 2));  // Log the detailed error
      return res.status(500).json({ error: 'Could not retrieve items', details: err.message });
    }
    res.status(200).json({ items: data.Items });
  });
};