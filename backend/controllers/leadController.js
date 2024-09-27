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
    const { businessId, otherBusinessId, leadId, status } = req.body;
    const updatedAt = new Date().toISOString();

    if (!businessId || !otherBusinessId || !leadId || !status) {
      return res.status(400).json({ error: 'businessId, otherBusinessId, leadId, and status are required.' });
    }

    // Prepare update parameters for both leads
    const params = {
      TransactItems: [
        {
          Update: {
            TableName: tableName,
            Key: {
              PK: `BUSINESS#${businessId}`,
              SK: `LEAD#${leadId}`,
            },
            UpdateExpression: 'SET #status = :status, updatedAt = :updatedAt',
            ExpressionAttributeNames: {
              '#status': 'status',
            },
            ExpressionAttributeValues: {
              ':status': status,
              ':updatedAt': updatedAt,
            },
          },
        },
        {
          Update: {
            TableName: tableName,
            Key: {
              PK: `BUSINESS#${otherBusinessId}`,
              SK: `LEAD#${leadId}`,
            },
            UpdateExpression: 'SET #status = :status, updatedAt = :updatedAt',
            ExpressionAttributeNames: {
              '#status': 'status',
            },
            ExpressionAttributeValues: {
              ':status': status,
              ':updatedAt': updatedAt,
            },
          },
        },
      ],
    };

    // Execute the transaction
    const command = new TransactWriteCommand(params);
    await dynamodb.send(command);

    // Respond with success
    res.status(200).json({
      message: 'Lead status updated successfully.',
    });
  } catch (error) {
    console.error('Error updating lead status:', error);
    res.status(500).json({
      error: 'An error occurred while updating the lead status.',
    });
  }
};