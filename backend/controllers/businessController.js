import dynamodb from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';
import Business from '../Objects/Business.js'

const tableName = 'FiloTableMVP1'; // Name of the DynamoDB table

///////////////// Adding Business /////////////////////
export const addBusiness = (req, res) => {
  const { id, name, logo, desc, owner, industry, address, email, phone, website } = req.body;

  const business = new Business(id, name, logo, desc, owner, industry, address, email, phone, website);

  try {
    business.validate();
  } catch (error) {
    console.error('Validation error:', error.message);
    // Handle the error (e.g., return a response to the client)
    return;
  }

  const item = business.toItem();

  const params = {
    TableName: tableName,
    Item: item,
    ConditionExpression: 'attribute_not_exists(PK)', // Prevents overwriting existing items
  };

  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error('Unable to add business. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      console.log('Added business:', JSON.stringify(data, null, 2));
    }
  });
};

///////////////// Fetching Business with ID /////////////////////
export const fetchBusinessByID = (req, res) => {
  // 1. Retrieve the Business ID from the URL parameters
  const businessId = req.params.id;


  if (!businessId) {
    return res.status(400).json({ error: 'Business ID is required.' });
  }

  // 2. Set up DynamoDB Get Parameters
  const params = {
    TableName: tableName, // Replace with your actual table name
    Key: {
      PK: 'BUSINESS#'+businessId,
      SK: 'METADATA',
    },
  };

  // 3. Perform the Get Operation
  dynamodb.get(params, (err, data) => {
    console.log('BUSINESS#'+businessId)
    if (err) {
      console.error(
        'Unable to get business. Error JSON:',
        JSON.stringify(err, null, 2)
      );
      // 4a. Handle Error Response
      res.status(500).json({ error: 'An error occurred while fetching the business.' });
    } else if (data.Item) {
      // 4b. Process the Retrieved Item
      const business = Business.fromItem(data.Item);
      console.log('Fetched business:', business);
      res.status(200).json(business);
    } else {
      console.log('Business not found');
      // 4c. Handle Business Not Found
      res.status(404).json({ error: 'Business not found.' });
    }
  });
};

///////////////// Fetching Business with email /////////////////////
export const fetchBusinessByEmail = (req, res) => {
  // Extract the email from the request body
  const email = req.body.email;

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  // Set up DynamoDB query parameters
  const params = {
    TableName: tableName, // Replace with your actual table name
    IndexName: 'GSI1', // The name of your GSI on the email attribute
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email,
    },
  };

  // Query the GSI for the business with the provided email
  dynamodb.query(params, (err, data) => {
    if (err) {
      console.error(
        'Unable to query business by email. Error JSON:',
        JSON.stringify(err, null, 2)
      );
      res.status(500).json({ error: 'An error occurred while fetching the business.' });
      console.log(err);
    } else if (data.Items && data.Items.length > 0) {
      // Assuming emails are unique, take the first item
      const business = Business.fromItem(data.Items[0]);
      console.log('Fetched business:', business);
      res.status(200).json(business);
    } else {
      console.log('Business not found');
      res.status(404).json({ error: 'Business not found.' });
    }
  });
};


///////////////// Fetching Partners for Business /////////////////////
export const fetchPartnersForBusiness = async (req, res) => {
  const businessId = req.params.id;
  console.log("BUSINESS ID: "+businessId);

  if (!businessId) {
    return res.status(400).json({ error: 'Business ID is required.' });
  }

  try {
    // Query for Partner items under the business's partition
    const params = {
      TableName: tableName,
      KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
      ExpressionAttributeValues: {
        ':pk': 'BUSINESS#'+businessId,
        ':sk': 'PARTNER#',
      },
    };

    const data = await dynamodb.query(params).promise();

    if (data.Items.length === 0) {
      return res.status(404).json({ error: 'No partners found for this business.' });
    }

    // Extract PartnerBusinessIDs
    const partnerBusinessIds = data.Items.map(item => item.PartnerBusinessID);

    // Remove duplicates, if any
    const uniquePartnerBusinessIds = [...new Set(partnerBusinessIds)];

    // Fetch partner business data for each PartnerBusinessID using batchGet
    const keys = uniquePartnerBusinessIds.map(id => ({
      PK: 'BUSINESS#'+id,
      SK: 'METADATA',
    }));

    const batchParams = {
      RequestItems: {
        [tableName]: {
          Keys: keys,
        },
      },
    };

    const batchData = await dynamodb.batchGet(batchParams).promise();

    // Map the retrieved items to Business instances
    const partnerBusinesses = batchData.Responses[tableName].map(item =>
      Business.fromItem(item)
    );

    // Return the partner businesses to the frontend
    res.status(200).json(partnerBusinesses);
  } catch (error) {
      console.error('Error fetching partners:', error);
      res.status(500).json({ error: 'An error occurred while fetching partners.. '+error });
  }
};
