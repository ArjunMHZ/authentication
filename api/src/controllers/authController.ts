// src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User, { UserDocument } from '../models/User';

const transporter = nodemailer.createTransport({

    host: 'smtp.gmail.com',
    port: 587, // or 587 for TLS
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'Your email address',
        pass: 'Your password',
    }
});

export const signup = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate verification code
        const verificationCode = Math.random().toString(36).substring(2, 8);

        // Create new user
        user = new User({
            email,
            password: hashedPassword,
            verificationCode
        });

        await user.save();

        // Send verification email
        sendVerificationEmail(email, verificationCode);

        res.status(201).json({ message: 'User created successfully. Please verify your email.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Wrong email or password' });
        }

        // Check if user is verified
        if (!user.isVerified) {
            return res.status(401).json({ message: 'Email not verified' });
        }

        // Generate tokens
        const userId = user._id as string;
        const accessToken = generateAccessToken(userId);
        const refreshToken = generateRefreshToken(userId);

        // Set refresh token in cookies
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            // Add other cookie options here (secure, sameSite, etc.)
        });

        res.json({ accessToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const verify = async (req: Request, res: Response) => {
    const { verificationCode } = req.body;

    try {
        // Find user by email and verification code
        const user = await User.findOne({ verificationCode });

        if (!user) {
            return res.status(404).json({ message: 'Invalid verification code' });
        }

        // Update user to mark as verified
        user.isVerified = true;
        user.verificationCode = ''; // Clear verification code after verification
        await user.save();

        res.json({ message: 'Email verified successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token not found' });
    }

    try {
        // Verify refresh token
        const RefreshTokenSecret: any = process.env.REFRESH_TOKEN_SECRET
        const decoded = jwt.verify(refreshToken, RefreshTokenSecret) as { userId: string };

        // Check if user exists
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate new access token
        const userId = user._id as string;
        const accessToken = generateAccessToken(userId);

        res.json({ accessToken });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid refresh token' });
    }
};

export const logout = (req: Request, res: Response) => {
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
};

// Helper function to generate JWT access token
const generateAccessToken = (userId: string) => {
    const payload = { userId }; 
    const AccessTokenSecret: any = process.env.ACCESS_TOKEN_SECRET;
    return jwt.sign( payload , AccessTokenSecret, { expiresIn: '2m' });
};

// Helper function to generate JWT refresh token
const generateRefreshToken = (userId: string) => {

    const RefreshTokenSecret: any = process.env.REFRESH_TOKEN_SECRET;
    return jwt.sign({ userId }, RefreshTokenSecret);
};

// Helper function to send verification email
const sendVerificationEmail = (email: string, verificationCode: string) => {
    const mailOptions = {
        from: 'arjunmhz03@gmail.com',
        to: email,
        subject: 'Account Verification',
        html: `<p>Please click <a href="http://localhost:5000/verify/${verificationCode}">here</a> to verify your account.</p>`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};
