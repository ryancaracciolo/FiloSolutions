import dynamodb from '../config/db.js';
import Lead from '../Objects/Lead.js';
import shortUUID from "short-uuid";
import { TransactWriteCommand } from '@aws-sdk/lib-dynamodb';
import multer from 'multer';
import multerS3 from 'multer-s3-v3';


const tableName = 'FiloTableMVP1'; // Name of the DynamoDB table

// Create Lead
export const createLead = async (req, res) => {

};
