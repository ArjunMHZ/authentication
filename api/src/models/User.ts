import  mongoose, { Schema, Document }  from "mongoose";

export interface UserDocument extends Document{
    email: string;
    password: string;
    isVerified: boolean;
    verificationCode: string;
}

const UserSchema = new Schema<UserDocument>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String
    },  
})

export default mongoose.model<UserDocument>('User', UserSchema)