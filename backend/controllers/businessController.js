import dynamodb from '../config/db.js';
import Business from '../Objects/Business.js'
import Lead from '../Objects/Lead.js'
import shortUUID from "short-uuid";


const tableName = 'FiloTableMVP1'; // Name of the DynamoDB table

///////////////// Adding Business /////////////////////
export const addBusiness = (req, res) => {
  const { name, logo, desc, owner, industry, address, email, phone, website } = req.body;

  const business = new Business(shortUUID().new(), name, logo, desc, owner, industry, address, email, phone, website);

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
  const businessId = req.params.id;


  if (!businessId) {
    return res.status(400).json({ error: 'Business ID is required.' });
  }

  const params = {
    TableName: tableName,
    Key: {
      PK: 'BUSINESS#'+businessId,
      SK: 'METADATA',
    },
  };

  dynamodb.get(params, (err, data) => {
    console.log('BUSINESS#'+businessId)
    if (err) {
      console.error(
        'Unable to get business. Error JSON:',
        JSON.stringify(err, null, 2)
      );
      // Handle Error Response
      res.status(500).json({ error: 'An error occurred while fetching the business.' });
    } else if (data.Item) {
      // Process the Retrieved Item
      const business = Business.fromItem(data.Item);
      console.log('Fetched business:', business);
      res.status(200).json(business);
    } else {
      console.log('Business not found');
      // Handle Business Not Found
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

  const params = {
    TableName: tableName,
    IndexName: 'GSI1', // The name of our GSI on the email attribute
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

//////////////// Checking if Email Exists /////////////////////
export const checkEmailExists = (req, res) => {
  // Extract the email from the request body
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

  // Query the GSI to check if the email exists
  dynamodb.query(params, (err, data) => {
    if (err) {
      console.error(
        'Unable to query email existence. Error JSON:',
        JSON.stringify(err, null, 2)
      );
      res.status(500).json({ error: 'An error occurred while checking the email.' });
    } else if (data.Items && data.Items.length > 0) {
      // Email exists in the database
      res.status(200).json({ exists: true });
    } else {
      // Email does not exist
      res.status(200).json({ exists: false });
    }
  });
};

///////////////// Fetching Partners /////////////////////
export const fetchPartnersForBusiness = async (req, res) => {
  const businessId = req.params.id;
  console.log("FETCHING PARTNERS");
  if (!businessId) {
    return res.status(400).json({ error: 'Business ID is required.' });
  }

  try {
    // Query for Partner items under the business's partition
    const params = {
      TableName: tableName,
      KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
      ExpressionAttributeValues: {
        ':pk': 'BUSINESS#' + businessId,
        ':sk': 'PARTNER#',
      },
    };

    const data = await dynamodb.query(params).promise();

    if (data.Items.length === 0) {
      return res.status(404).json({ error: 'No partners found for this business.' });
    }

    // Step 1: Create a map of partnerId to status
    const partnerInfoMap = {};
    data.Items.forEach((item) => {
      const partnerId = item.partnerId;
      partnerInfoMap[partnerId] = {
        status: item.status
      };
    });

    // Step 2: Extract PartnerBusinessIDs
    const partnerIds = Object.keys(partnerInfoMap);

    // Step 3: Fetch partner business data for each PartnerBusinessID using batchGet
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

    const batchData = await dynamodb.batchGet(batchParams).promise();

    // Step 4: Initialize the result structure
    const result = {
      Pending_Sent: [],
      Pending_Received: [],
      Confirmed: [],
      Suggested: [],
    };

    // Step 5: Map the retrieved items and group them by status
    batchData.Responses[tableName].forEach((item) => {
      const partnerBusiness = Business.fromItem(item);
      const partnerId = item.PK.replace('BUSINESS#', '');
      const { status } = partnerInfoMap[partnerId];

      if (result[status]) {
        result[status].push(partnerBusiness);
      } else {
        // Handle unexpected statuses if necessary
        console.warn(`Unknown status '${status}' for partnerId '${partnerId}'`);
      }
    });

    // Return the structured result to the frontend
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching partners:', error);
    res.status(500).json({ error: 'An error occurred while fetching partners: ' + error });
  }
};


//////////////////// Fetching Leads /////////////////////////////
export const fetchLeadsForBusiness = async (req, res) => {
  const businessId = req.params.id;

  if (!businessId) {
    return res.status(400).json({ error: 'Business ID is required.' });
  }

  try {
    // Query for Partner items under the business's partition
    const params = {
      TableName: tableName,
      KeyConditionExpression: 'PK = :pk AND begins_with(SK, :skPrefix)',
      ExpressionAttributeValues: {
        ':pk': `BUSINESS#${businessId}`,
        ':skPrefix': 'LEAD#',
      },
    };

    const data = await dynamodb.query(params).promise();

    if (data.Items.length === 0) {
      return res.status(404).json({ error: 'No leads found for this business.' });
    }

    // Map the retrieved items to Lead instances
    const leads = data.Items.map(item =>
      Lead.fromItem(item)
    );

    // Return the partner businesses to the frontend
    res.status(200).json(partnerBusinesses);

  } catch (error) {
      console.error('Error fetching partners:', error);
      res.status(500).json({ error: 'An error occurred while fetching partners.. '+error });
  }
};



export const fetchBusinessName = async (req, res) => { 
  try {
    const businessId = req.params.id;

    if (!businessId) {
      return res.status(400).json({ error: 'businessId is required.' });
    }

    const params = {
      TableName: tableName,
      Key: {
        PK: `BUSINESS#${businessId}`,
        SK: 'PROFILE',
      },
      ProjectionExpression: 'name',
    };

    const result = await dynamodb.get(params).promise();

    if (!result.Item) {
      return res.status(404).json({ error: 'Business not found.' });
    }

    res.status(200).json({ name: result.Item.name });
  } catch (error) {
    console.error('Error fetching business name:', error);
    res.status(500).json({ error: 'An error occurred while fetching the business name.' });
  }
};


