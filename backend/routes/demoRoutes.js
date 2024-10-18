import express from 'express';
import { addToDemo } from '../controllers/demoController.js';

const router = express.Router();

router.post('/add-user', addToDemo);

export default router;