import dynamodb from '../config/db.js';
import Partnership from '../Objects/Partnership.js';
import shortUUID from "short-uuid";
import { TransactWriteCommand } from '@aws-sdk/lib-dynamodb';

const tableName = 'FiloTableMVP1'; // Name of the DynamoDB table

// Send Partnership
export const createPartnership = async (req, res) => {
  try {
    const { businessId1, businessId2, status } = req.body;

    // Validate input
    if (!businessId1 || !businessId2) {
      return res.status(400).json({ error: 'Both businessId1 and businessId2 are required.' });
    }
    if (businessId1 === businessId2) {
      return res.status(400).json({ error: 'A business cannot partner with itself.' });
    }

    const newid = shortUUID().new();
    const createDate = new Date().toISOString();
    let statusOne = status;
    let statusTwo = status;

    if (status === "Pending" || status === "Pending_Sent") {
      statusOne = "Pending_Sent";
      statusTwo = "Pending_Received";
    }

    const partnerOne = new Partnership(
      newid,
      businessId1,
      businessId2,
      statusOne,
      createDate
    );

    const partnerTwo = new Partnership(
      newid,
      businessId2,
      businessId1,
      statusTwo,
      createDate
    );

    const partnerItem1 = partnerOne.toItem();
    const partnerItem2 = partnerTwo.toItem();

    // Prepare transactional write
    const transactParams = {
      TransactItems: [
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
    const command = new TransactWriteCommand(transactParams);
    await dynamodb.send(command);

    // Respond with the created partnership
    res.status(201).json({
      message: 'Partnership created successfully.',
      partnerItemOne: partnerItem1,
      partnerItemTwo: partnerItem2,
    });

  } catch (error) {
    console.error('Error creating partnership:', error);

    if (error.name === 'ConditionalCheckFailedException') {
      return res.status(409).json({ error: 'Partnership already exists or business is already a partner.' });
    }

    res.status(500).json({ error: 'An error occurred while creating the partnership.' });
  }
};

// Update Partnership
export const updatePartnership = async (req, res) => {
  try {
    const { businessId1, businessId2, status } = req.body;

    // Validate input
    if (!businessId1 || !businessId2 || !status) {
      return res.status(400).json({ error: 'businessId1, businessId2 and status are required.' });
    }
    if (businessId1 === businessId2) {
      return res.status(400).json({ error: 'A business cannot partner with itself.' });
    }

    let statusOne = status;
    let statusTwo = status;
    if (status === 'Pending' || status === 'Pending_Sent') {
      statusOne = 'Pending_Sent';
      statusTwo = 'Pending_Received';
    } else if (status === 'Pending_Received') {
      statusOne = 'Pending_Received';
      statusTwo = 'Pending_Sent';
    }

    // Prepare transactional update
    const transactParams = {
      TransactItems: [
        {
          Update: {
            TableName: tableName,
            Key: {
              PK: `BUSINESS#${businessId1}`,
              SK: `PARTNER#${businessId2}`,
            },
            UpdateExpression: 'SET #status = :newStatus',
            ExpressionAttributeNames: {
              '#status': 'status',
            },
            ExpressionAttributeValues: {
              ':newStatus': statusOne,
            },
          },
        },
        {
          Update: {
            TableName: tableName,
            Key: {
              PK: `BUSINESS#${businessId2}`,
              SK: `PARTNER#${businessId1}`,
            },
            UpdateExpression: 'SET #status = :newStatus',
            ExpressionAttributeNames: {
              '#status': 'status',
            },
            ExpressionAttributeValues: {
              ':newStatus': statusTwo,
            },
          },
        },
      ],
    };

    // Execute the transaction
    const command = new TransactWriteCommand(transactParams);
    await dynamodb.send(command);

    // Respond with success
    res.status(200).json({
      message: 'Partnership updated successfully.',
    });

  } catch (error) {
    console.error('Error updating partnership:', error);

    if (error.name === 'ConditionalCheckFailedException') {
      return res.status(400).json({ error: 'Partnership invite does not exist or is not pending.' });
    }

    res.status(500).json({ error: 'An error occurred while updating the partnership.' });
  }
};