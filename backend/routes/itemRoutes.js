import express from 'express';
import { addItem, getItems } from '../controllers/itemController.js';

const router = express.Router();

router.post('/add-item', addItem);
router.get('/get-items', getItems);

export default router;