import dynamodb from '../config/db.js';
import shortUUID from "short-uuid";
import { PutCommand, GetCommand, QueryCommand, BatchGetCommand } from '@aws-sdk/lib-dynamodb';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv'; // Package that loads environment variables from a .env file into process.env

dotenv.config();
const tableName = 'Waitlist'; // Name of the DynamoDB table

export const addToWaitlist = async (req, res) => {
    const { fullName, email } = req.body;
    if (!fullName || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }

    const item = {
      PK: `USER#${email}`, // Partition Key to make sure each email is unique
      SK: 'METADATA', // Sort Key
      fullName: fullName,
      email: email,
      joinedAt: new Date().toISOString(),
    };
  
    const params = {
      TableName: tableName,
      Item: item,
      ConditionExpression: 'attribute_not_exists(PK)', // Prevents overwriting existing items with the same PK
    };
  
    try {
      const command = new PutCommand(params);
      await dynamodb.send(command);
      await sendEmailAlert(fullName, email);
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


const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',  // Replace with your SMTP host
    port: 587,  // or 587 for TLS
    secure: false,  // Use true for SSL, false for TLS
    auth: {
      user: process.env.MY_EMAIL,  // Your business email
      pass: process.env.MY_PASSWORD,  // Your email password or app-specific password
    },
});
  
const sendEmailAlert = async (name, email) => {
    const mailOptions = {
      from: process.env.MY_EMAIL,  // Your business email
      to: email,  // Where you want to receive alerts
      subject: 'Filo Waitlist',
      text: `Hi ${name}, thanks for joining the Filo waitlist! We will contact you soon with more details on upcoming launches.`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log('Alert email sent successfully.');
    } catch (err) {
      console.error('Error sending alert email:', err);
    }
};