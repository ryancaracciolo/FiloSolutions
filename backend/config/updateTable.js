import AWS from 'aws-sdk'; 

AWS.config.update({ region: 'us-east-1' }); // Replace 'us-west-2' with your desired region

const dynamodb = new AWS.DynamoDB();

const params = {
  TableName: 'FiloTableMVP1',
  AttributeDefinitions: [
    { AttributeName: 'GSI2PK', AttributeType: 'S' },
    { AttributeName: 'name', AttributeType: 'S' },
  ],
  GlobalSecondaryIndexUpdates: [
    {
      Create: {
        IndexName: 'BusinessNameIndex',
        KeySchema: [
          { AttributeName: 'GSI2PK', KeyType: 'HASH' }, // Partition Key
          { AttributeName: 'name', KeyType: 'RANGE' }, // Sort Key
        ],
        Projection: {
          ProjectionType: 'ALL', // Include all attributes in the index
        },
      },
    },
  ],
};

dynamodb.updateTable(params, (err, data) => {
  if (err) {
    console.error('Error updating table:', err);
  } else {
    console.log('GSI added successfully:', data);
  }
});