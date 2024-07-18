import mongoose, {Document, Schema}  from "mongoose"

export interface CompanyDocument extends Document{
    companyname: string;
    australiabusinessnumber: number;
    registeredbusinessname: string;
    country: string;
    physicaladdress: string;
    postaladdress: string;
}

const CompanySchema = new Schema<CompanyDocument>({

    companyname:{
        type: String,
        // required: true,
    },
    australiabusinessnumber:{
        type: Number,
        // required: true,
    },
    registeredbusinessname:{
        type: String,
        // required: true,
    },
    country:{
        type: String,
        // required: true,
    },
    physicaladdress:{
        type: String,
        // required: true,
    },
    postaladdress:{
        type: String,
        // required: true
    }
}, {timestamps: true})

export default mongoose.model<CompanyDocument>('Company', CompanySchema)