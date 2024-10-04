import dynamodb from '../config/db.js';
import Lead from '../Objects/Lead.js';
import shortUUID from "short-uuid";
import { TransactWriteCommand } from '@aws-sdk/lib-dynamodb';


const tableName = 'FiloTableMVP1'; // Name of the DynamoDB table

// Create Lead
export const createLead = async (req, res) => {
  try {
    const { businessId, otherBusinessId, name, email, phone, note, status} = req.body;

    // Input validation (optional but recommended)
    if (!businessId || !otherBusinessId || !name || !email || !status) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    if (businessId === otherBusinessId) {
      return res.status(400).json({ error: 'businessId and otherBusinessId cannot be the same.' });
    }

    const leadId = shortUUID().new();
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;


    // Create Lead object for sender
    const senderLead = new Lead({
      id: leadId,
      businessId: businessId,
      otherBusinessId: otherBusinessId,
      name: name,
      email: email,
      phone: phone,
      note: note,
      status: status,
      direction: 'Shared',
      createdAt: createdAt,
      updatedAt: updatedAt
    });

    // Create Lead object for recipient
    const recipientLead = new Lead({
      id: leadId,
      businessId: otherBusinessId,
      otherBusinessId: businessId,
      name: name,
      email: email,
      phone: phone,
      note: note,
      status: status,
      direction: 'Received',
      createdAt: createdAt,
      updatedAt: updatedAt
    });

    console.log(senderLead)
    // Convert to DynamoDB items
    const senderItem = senderLead.toItem();
    const recipientItem = recipientLead.toItem();


    // Transact write to DynamoDB
    const params = {
      TransactItems: [
        {
          Put: {
            TableName: tableName,
            Item: senderItem,
          },
        },
        {
          Put: {
            TableName: tableName,
            Item: recipientItem,
          },
        },
      ],
    };

    // Execute the transaction
    const command = new TransactWriteCommand(params);
    await dynamodb.send(command);

    // Respond with success
    res.status(201).json({
      message: 'Lead created successfully.',
      leadId,
    });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({
      error: 'An error occurred while creating the lead.',
    });
  }
};

// Update Lead
export const updateLead = async (req, res) => {
  try {
    const { leadId, businessId, otherBusinessId, status } = req.body;

    // Input validation
    if (!leadId || !businessId || !otherBusinessId || !status) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const updatedAt = new Date().toISOString();

    // Construct PK and SK for both sender and recipient
    const senderPK = `BUSINESS#${businessId}`;
    const senderSK = `LEAD#${leadId}`;

    const recipientPK = `BUSINESS#${otherBusinessId}`;
    const recipientSK = `LEAD#${leadId}`;

    // Prepare the transaction to update both sender and recipient leads
    const updateParams = {
      TransactItems: [
        {
          Update: {
            TableName: tableName,
            Key: {
              PK: senderPK,
              SK: senderSK,
            },
            UpdateExpression: 'SET #status = :status, updatedAt = :updatedAt',
            ExpressionAttributeNames: {
              '#status': 'status',
            },
            ExpressionAttributeValues: {
              ':status': status,
              ':updatedAt': updatedAt,
            },
            ConditionExpression: 'attribute_exists(PK) AND attribute_exists(SK)',
          },
        },
        {
          Update: {
            TableName: tableName,
            Key: {
              PK: recipientPK,
              SK: recipientSK,
            },
            UpdateExpression: 'SET #status = :status, updatedAt = :updatedAt',
            ExpressionAttributeNames: {
              '#status': 'status',
            },
            ExpressionAttributeValues: {
              ':status': status,
              ':updatedAt': updatedAt,
            },
            ConditionExpression: 'attribute_exists(PK) AND attribute_exists(SK)',
          },
        },
      ],
    };

    // Execute the transaction
    const updateCommand = new TransactWriteCommand(updateParams);
    await dynamodb.send(updateCommand);

    // Respond with success
    res.status(200).json({
      message: 'Lead updated successfully.',
      leadId,
    });
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({
      error: 'An error occurred while updating the lead.',
    });
  }
};

export const deleteLead = async (req, res) => {
  try {
    const { leadId, businessId, otherBusinessId } = req.body;
    console.log(leadId+', '+businessId+', '+otherBusinessId)

    // Input validation
    if (!leadId || !businessId || !otherBusinessId) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    // Construct PK and SK for both sender and recipient
    const senderPK = `BUSINESS#${businessId}`;
    const senderSK = `LEAD#${leadId}`;

    const recipientPK = `BUSINESS#${otherBusinessId}`;
    const recipientSK = `LEAD#${leadId}`;

    // Prepare the transaction to delete both sender's and recipient's leads
    const deleteParams = {
      TransactItems: [
        {
          Delete: {
            TableName: tableName,
            Key: {
              PK: senderPK,
              SK: senderSK,
            },
            ConditionExpression: 'attribute_exists(PK) AND attribute_exists(SK)',
          },
        },
        {
          Delete: {
            TableName: tableName,
            Key: {
              PK: recipientPK,
              SK: recipientSK,
            },
            ConditionExpression: 'attribute_exists(PK) AND attribute_exists(SK)',
          },
        },
      ],
    };

    // Execute the transaction
    const deleteCommand = new TransactWriteCommand(deleteParams);
    await dynamodb.send(deleteCommand);

    // Respond with success
    res.status(200).json({
      message: 'Lead deleted successfully.',
      leadId,
    });
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({
      error: 'An error occurred while deleting the lead.',
    });
  }
};