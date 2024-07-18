import Company, { CompanyDocument } from "../models/CompanyField";
import { Request, Response } from "express";

export const companyregistration = async (req: Request, res: Response) => {
    try {
      const {
        companyname,
        australiabusinessnumber,
        registeredbusinessname,
        country,
        physicaladdress,
        postaladdress,
      } = req.body;
  
      const existingCompany = await Company.findOne({ companyname });
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
  
      const newCompany = new Company(companyData);
      const savedCompany = await newCompany.save();
  
      if (!savedCompany) {
        return res.status(400).json({ error: "Could not create company" });
      }
  
      return res.status(200).json({ message: "Company created successfully", data: savedCompany });
    }catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
};