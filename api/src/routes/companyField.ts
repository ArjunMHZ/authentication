import express from 'express'
import {companyregistration } from '../controllers/companyController'

const router = express.Router();
 
router.post("/companyregistration", companyregistration)

export default router;