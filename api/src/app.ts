import express, {Request, Response, NextFunction} from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from "cors";
import authRoutes from './routes/auth';
import employeeRoutes from './routes/employee';
import companyFieldRoutes from './routes/companyField'

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if using HTTPS
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day (adjust as needed)
    }
}));

app.use('/api/auth', authRoutes);
app.use('/api/auth', employeeRoutes);
app.use('/api/company', companyFieldRoutes);
app.use(express.static('Public'))

const mongoURI: any = process.env.MONGO_URI;

mongoose.connect(mongoURI,).then(() => {
    console.log('MongoDB connected');
}).catch(err => console.error(err));


interface CustomError extends Error {
    status?: number;
    stack?: string;
}

app.use((err: CustomError,req: Request, res: Response, next: NextFunction) =>{
   
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


