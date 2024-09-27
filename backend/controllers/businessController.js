import dynamodb from '../config/db.js';
import Business from '../Objects/Business.js';
import Lead from '../Objects/Lead.js';
import shortUUID from "short-uuid";
import { PutCommand, GetCommand, QueryCommand, BatchGetCommand } from '@aws-sdk/lib-dynamodb';

const tableName = 'FiloTableMVP1'; // Name of the DynamoDB table

////////////////////////////// Adding Business
export const addBusiness = async (req, res) => {
  const { name, logo, desc, owner, industry, address, email, phone, website } = req.body;

  const business = new Business(shortUUID().new(), name, logo, desc, owner, industry, address, email, phone, website);

  try {
    business.validate();
  } catch (error) {
    console.error('Validation error:', error.message);
    return res.status(400).json({ error: error.message });
  }

  const item = business.toItem();

  const params = {
    TableName: tableName,
    Item: item,
    ConditionExpression: 'attribute_not_exists(PK)', // Prevents overwriting existing items
  };

  try {
    const command = new PutCommand(params);
    await dynamodb.send(command);
    console.log('Added business:', JSON.stringify(item, null, 2));
    res.status(201).json({ message: 'Business added successfully.' });
  } catch (err) {
    console.error('Unable to add business. Error JSON:', JSON.stringify(err, null, 2));
    res.status(500).json({ error: 'An error occurred while adding the business.' });
  }
};

//////////////////////////////////// Fetching Business with ID
export const fetchBusinessByID = async (req, res) => {
  const businessId = req.params.id;

  if (!businessId) {
    return res.status(400).json({ error: 'Business ID is required.' });
  }

  const params = {
    TableName: tableName,
    Key: {
      PK: 'BUSINESS#' + businessId,
      SK: 'METADATA',
    },
  };

  try {
    const command = new GetCommand(params);
    const data = await dynamodb.send(command);
    console.log('BUSINESS#' + businessId);

    if (data.Item) {
      const business = Business.fromItem(data.Item);
      console.log('Fetched business:', business);
      res.status(200).json(business);
    } else {
      console.log('Business not found');
      res.status(404).json({ error: 'Business not found.' });
    }
  } catch (err) {
    console.error('Unable to get business. Error JSON:', JSON.stringify(err, null, 2));
    res.status(500).json({ error: 'An error occurred while fetching the business.' });
  }
};

////////////////////////////////// Fetching Business with email
export const fetchBusinessByEmail = async (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  const params = {
    TableName: tableName,
    IndexName: 'GSI1', // The name of our GSI on the email attribute
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email,
    },
  };

  try {
    const command = new QueryCommand(params);
    const data = await dynamodb.send(command);

    if (data.Items && data.Items.length > 0) {
      const business = Business.fromItem(data.Items[0]);
      console.log('Fetched business:', business);
      res.status(200).json(business);
    } else {
      console.log('Business not found');
      res.status(404).json({ error: 'Business not found.' });
    }
  } catch (err) {
    console.error('Unable to query business by email. Error JSON:', JSON.stringify(err, null, 2));
    res.status(500).json({ error: 'An error occurred while fetching the business.' });
  }
};

////////////////////////////// Checking if Email Exists
export const checkEmailExists = async (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  const params = {
    TableName: tableName,
    IndexName: 'GSI1', // The name of our GSI on the email attribute
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email,
    },
    ProjectionExpression: 'email', // Only fetch the email attribute to save bandwidth
    Limit: 1, // Limit to 1 item since we're only checking existence
  };

  try {
    const command = new QueryCommand(params);
    const data = await dynamodb.send(command);

    if (data.Items && data.Items.length > 0) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (err) {
    console.error('Unable to query email existence. Error JSON:', JSON.stringify(err, null, 2));
    res.status(500).json({ error: 'An error occurred while checking the email.' });
  }
};

//////////////////////////////////////// Fetching Partners
export const fetchPartnersForBusiness = async (req, res) => {
  const businessId = req.params.id;
  console.log("FETCHING PARTNERS");
  if (!businessId) {
    return res.status(400).json({ error: 'Business ID is required.' });
  }

  try {
    const params = {
      TableName: tableName,
      KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
      ExpressionAttributeValues: {
        ':pk': 'BUSINESS#' + businessId,
        ':sk': 'PARTNER#',
      },
    };

    const command = new QueryCommand(params);
    const data = await dynamodb.send(command);

    if (data.Items.length === 0) {
      return res.status(404).json({ error: 'No partners found for this business.' });
    }

    const partnerInfoMap = {};
    data.Items.forEach((item) => {
      const partnerId = item.partnerId;
      partnerInfoMap[partnerId] = {
        status: item.status
      };
    });

    const partnerIds = Object.keys(partnerInfoMap);

    const keys = partnerIds.map((id) => ({
      PK: 'BUSINESS#' + id,
      SK: 'METADATA',
    }));

    const batchParams = {
      RequestItems: {
        [tableName]: {
          Keys: keys,
        },
      },
    };

    const batchCommand = new BatchGetCommand(batchParams);
    const batchData = await dynamodb.send(batchCommand);

    const result = {
      Pending_Sent: [],
      Pending_Received: [],
      Confirmed: [],
      Suggested: [],
    };

    batchData.Responses[tableName].forEach((item) => {
      const partnerBusiness = Business.fromItem(item);
      const partnerId = item.PK.replace('BUSINESS#', '');
      const { status } = partnerInfoMap[partnerId];

      if (result[status]) {
        result[status].push(partnerBusiness);
      } else {
        console.warn(`Unknown status '${status}' for partnerId '${partnerId}'`);
      }
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching partners:', error);
    res.status(500).json({ error: 'An error occurred while fetching partners: ' + error });
  }
};

// Fetch Leads for a Business and include Business Names
export const fetchLeadsForBusiness = async (req, res) => {
  const businessId = req.params.id;

  if (!businessId) {
    return res.status(400).json({ error: 'Business ID is required.' });
  }

  try {
    const params = {
      TableName: tableName,
      KeyConditionExpression: 'PK = :pk AND begins_with(SK, :skPrefix)',
      ExpressionAttributeValues: {
        ':pk': `BUSINESS#${businessId}`,
        ':skPrefix': 'LEAD#',
      },
    };

    const command = new QueryCommand(params);
    const data = await dynamodb.send(command);

    if (!data.Items || data.Items.length === 0) {
      return res.status(404).json({ error: 'No leads found for this business.' });
    }

    // Map leads and fetch associated business names
    const leads = await Promise.all(
      data.Items.map(async (item) => {
        const lead = Lead.fromItem(item);
        console.log(lead);
        // Fetch the name of the business for `otherBusinessId`
        try {
          const nameParams = {
            TableName: tableName,
            Key: {
              PK: `BUSINESS#${lead.otherBusinessId}`,
              SK: 'METADATA',
            },
            ProjectionExpression: '#name', // Use #name to avoid conflict with reserved words
            ExpressionAttributeNames: {
              '#name': 'name', // Define #name as an alias for the actual 'name' attribute
            },
          };

          const nameCommand = new GetCommand(nameParams);
          const nameData = await dynamodb.send(nameCommand);

          if (nameData.Item && nameData.Item['name']) {
            lead.otherBusinessName = nameData.Item['name']; // Append the business name to the lead
          } else {
            lead.otherBusinessName = 'Unknown Business'; // Fallback if name is not available
          }
        } catch (error) {
          console.error(`Error fetching business name for ${lead.otherBusinessId}:`, error);
          lead.otherBusinessName = 'Error Fetching Name';
        }

        return lead;
      })
    );

    res.status(200).json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ error: 'An error occurred while fetching leads. ' + error });
  }
};