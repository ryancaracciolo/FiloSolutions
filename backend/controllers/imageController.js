import dynamodb from '../config/db.js';
import { TransactWriteCommand } from '@aws-sdk/lib-dynamodb';
import multer from 'multer';
import multerS3 from 'multer-s3-v3';

const tableName = 'FiloTableMVP1'; // Name of the DynamoDB table
const bucketName = 'filo-mvp-images'; // Name of the DynamoDB table


const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: bucketName,         // Replace with your bucket name
      acl: 'public-read',                 // 'private' if you don't want public access
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
        cb(null, Date.now().toString() + '_' + file.originalname);
      }
    })
  });
