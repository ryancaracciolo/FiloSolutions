import dynamodb from '../config/db.js';
import Partnership from '../Objects/Partnership.js'; // Adjust the path as necessary

const tableName = 'FiloTableMVP1'; // Name of the DynamoDB table

// POST /partnerships
export const createPartnership = async (req, res) => {
  try {
    const { businessId1, businessId2 } = req.body;

    // Validate input
    if (!businessId1 || !businessId2) {
      return res.status(400).json({ error: 'Both businessId1 and businessId2 are required.' });
    }

    if (businessId1 === businessId2) {
      return res.status(400).json({ error: 'A business cannot partner with itself.' });
    }

    // Optionally, verify that both businesses exist
    const businessKeys = [
      { PK: `BUSINESS#${businessId1}`, SK: 'METADATA' },
      { PK: `BUSINESS#${businessId2}`, SK: 'METADATA' },
    ];

    const batchGetParams = {
      RequestItems: {
        [tableName]: { // Replace with your actual table name
          Keys: businessKeys,
        },
      },
    };

    const batchGetData = await dynamodb.batchGet(batchGetParams).promise();

    if (
      !batchGetData.Responses[tableName] ||
      batchGetData.Responses[tableName].length !== 2
    ) {
      return res.status(404).json({ error: 'One or both businesses not found.' });
    }

    // Create a new Partnership instance
    const partnership = new Partnership(businessId1, businessId2);
    const partnershipItem = partnership.toItem();

    // Create Partner items for both businesses
    const partnerItem1 = {
      PK: `BUSINESS#${businessId1}`,
      SK: `PARTNER#${businessId2}#PARTNERSHIP#${partnership.id}`,
      Type: 'Partner',
      PartnerBusinessID: businessId2,
      PartnershipID: partnership.id,
      createdAt: partnership.createdAt,
      updatedAt: partnership.updatedAt,
    };

    const partnerItem2 = {
      PK: `BUSINESS#${businessId2}`,
      SK: `PARTNER#${businessId1}#PARTNERSHIP#${partnership.id}`,
      Type: 'Partner',
      PartnerBusinessID: businessId1,
      PartnershipID: partnership.id,
      createdAt: partnership.createdAt,
      updatedAt: partnership.updatedAt,
    };

    // Prepare transactional write
    const transactParams = {
      TransactItems: [
        {
          Put: {
            TableName: tableName, // Replace with your actual table name
            Item: partnershipItem,
            ConditionExpression: 'attribute_not_exists(PK)', // Prevent overwriting
          },
        },
        {
          Put: {
            TableName: tableName,
            Item: partnerItem1,
            ConditionExpression: 'attribute_not_exists(PK) AND attribute_not_exists(SK)', // Prevent overwriting
          },
        },
        {
          Put: {
            TableName: tableName,
            Item: partnerItem2,
            ConditionExpression: 'attribute_not_exists(PK) AND attribute_not_exists(SK)', // Prevent overwriting
          },
        },
      ],
    };

    // Execute the transaction
    await dynamodb.transactWrite(transactParams).promise();

    // Respond with the created partnership
    res.status(201).json({
      message: 'Partnership created successfully.',
      partnership: partnershipItem,
    });
  } catch (error) {
    console.error('Error creating partnership:', error);

    if (error.code === 'ConditionalCheckFailedException') {
      return res.status(409).json({ error: 'Partnership already exists or business is already a partner.' });
    }

    res.status(500).json({ error: 'An error occurred while creating the partnership.' });
  }
};


