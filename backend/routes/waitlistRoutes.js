import express from 'express';
import { addToWaitlist } from '../controllers/waitlistController.js';

const router = express.Router();

router.post('/add-user', addToWaitlist);

export default router;