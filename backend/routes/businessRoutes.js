import express from 'express';
import { addBusiness, fetchBusinessByID, fetchBusinessByEmail, fetchPartnersForBusiness } from '../controllers/businessController.js';


const router = express.Router();

router.post('/add-business', addBusiness);
router.get('/get-business/:id', fetchBusinessByID);
router.post('/get-business-byemail', fetchBusinessByEmail);
router.get('/get-partners/:id', fetchPartnersForBusiness);


export default router;