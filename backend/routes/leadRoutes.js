import express from 'express';
import { createLead, 
    updateLead,
    deleteLead } from '../controllers/leadController.js';

const router = express.Router();

router.post('/create-lead', createLead);
router.post('/update-lead', updateLead);
router.post('/delete-lead', deleteLead);

export default router;