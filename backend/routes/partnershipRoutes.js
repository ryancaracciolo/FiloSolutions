import express from 'express';
import { createPartnership, 
    updatePartnership } from '../controllers/partnershipController.js';

const router = express.Router();

router.post('/create-partnership', createPartnership);
router.post('/update-partnership', updatePartnership);

export default router;