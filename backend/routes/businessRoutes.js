import express from 'express';
import { addBusiness,
    addBusinesses, 
    fetchBusinessByID, 
    fetchBusinessByEmail,
    checkEmailExists, 
    fetchPartnersForBusiness, 
    fetchLeadsForBusiness,
    searchBusinesses
    } from '../controllers/businessController.js';

const router = express.Router();

router.post('/add-business', addBusiness);
router.post('/add-businesses', addBusinesses);
router.get('/get-business/:id', fetchBusinessByID);
router.post('/get-business-byemail', fetchBusinessByEmail);
router.post('/check-existence', checkEmailExists);
router.get('/get-partners/:id', fetchPartnersForBusiness);
router.get('/get-leads/:id', fetchLeadsForBusiness);
router.get('/search', searchBusinesses);

 
export default router;