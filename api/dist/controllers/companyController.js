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
exports.companyregistration = void 0;
const CompanyField_1 = __importDefault(require("../models/CompanyField"));
const companyregistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { companyname, australiabusinessnumber, registeredbusinessname, country, physicaladdress, postaladdress, } = req.body;
        const existingCompany = yield CompanyField_1.default.findOne({ companyname });
        if (existingCompany) {
            return res.status(400).json({ error: "Company with the same name already exists" });
        }
        const companyData = {
            companyname,
            australiabusinessnumber,
            registeredbusinessname,
            country,
            physicaladdress,
            postaladdress,
        };
        const newCompany = new CompanyField_1.default(companyData);
        const savedCompany = yield newCompany.save();
        if (!savedCompany) {
            return res.status(400).json({ error: "Could not create company" });
        }
        return res.status(200).json({ message: "Company created successfully", data: savedCompany });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.companyregistration = companyregistration;
