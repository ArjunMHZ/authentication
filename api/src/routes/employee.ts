import express from 'express'
import { Request, Response } from "express";
import {  addEmployee, getAllEmployees } from '../controllers/employeeController';
import multer from 'multer';
import path from "path";
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// image upload
const storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        cb(null, 'Public/Images')
    },
    filename: (req: Request, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

//finish image upload
router.post('/addEmployee', authenticateToken, upload.single('profilePic'), addEmployee);
router.get('/getAllEmployees', authenticateToken, getAllEmployees);

export default router;