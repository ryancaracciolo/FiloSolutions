import express from 'express';
import { createLead, 
    updateLead } from '../controllers/leadController.js';

const router = express.Router();

router.post('/create-lead', createLead);
router.post('/update-lead', updateLead);

export default router;