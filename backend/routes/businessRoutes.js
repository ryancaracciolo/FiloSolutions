import express from 'express';
import { addBusiness, 
    fetchBusinessByID, 
    fetchBusinessByEmail, 
    fetchPartnersForBusiness, 
    fetchLeadsForBusiness,
    fetchBusinessName } from '../controllers/businessController.js';

const router = express.Router();

router.post('/add-business', addBusiness);
router.get('/get-business/:id', fetchBusinessByID);
router.post('/get-business-byemail', fetchBusinessByEmail);
router.get('/get-partners/:id', fetchPartnersForBusiness);
router.get('/get-leads/:id', fetchLeadsForBusiness);
router.get('/get-name/:id', fetchBusinessName);


export default router;