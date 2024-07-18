import { Request, Response } from "express";
import Employee, { EmployeeDocument } from '../models/Employee';
// import multer from 'multer';
// import path from "path";

// // image upload
// const storage = multer.diskStorage({
//     destination: (req: Request, file, cb) => {
//         cb(null, 'Public/Images')
//     },
//     filename: (req: Request, file, cb) => {
//         cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({
//     storage: storage
// })

// interface MulterRequest extends Request {
//     file: Express.Multer.File;
// }

//finish image upload

export const addEmployee = 
    async (req: Request, res: Response) => {
        const { firstName, lastName } = req.body;
        const profilePic = req.file?.filename; // Get the uploaded file's filename

        try {
            const employee = new Employee({
                firstName,
                lastName,
                profilePic
            })
            await employee.save();
            res.status(201).json({ message: "New employee added successfully." });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }


export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find(); 
    res.status(200).json(employees); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


