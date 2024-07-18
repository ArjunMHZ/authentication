"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEmployees = exports.addEmployee = void 0;
const Employee_1 = __importDefault(require("../models/Employee"));
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
const addEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { firstName, lastName } = req.body;
    const profilePic = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename; // Get the uploaded file's filename
    try {
        const employee = new Employee_1.default({
            firstName,
            lastName,
            profilePic
        });
        yield employee.save();
        res.status(201).json({ message: "New employee added successfully." });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.addEmployee = addEmployee;
const getAllEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield Employee_1.default.find();
        res.status(200).json(employees);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getAllEmployees = getAllEmployees;
