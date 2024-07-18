import  mongoose, { Schema, Document }  from "mongoose";

export interface EmployeeDocument extends Document{
    firstName: string;
    lastName: string;
    profilePic: string;
}

const EmployeeSchema = new Schema<EmployeeDocument>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: true
    },
})

export default mongoose.model<EmployeeDocument>('Employee', EmployeeSchema)