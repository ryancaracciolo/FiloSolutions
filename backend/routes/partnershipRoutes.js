import express from 'express';
import { createPartnership } from '../controllers/partnershipController.js';

const router = express.Router();

router.post('/create-partnership', createPartnership);

export default router;