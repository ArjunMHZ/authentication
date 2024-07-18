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
exports.logout = exports.refreshToken = exports.verify = exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const User_1 = __importDefault(require("../models/User"));
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 587, // or 587 for TLS
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'Your email address',
        pass: 'Your password',
    }
});
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Check if user already exists
        let user = yield User_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Generate verification code
        const verificationCode = Math.random().toString(36).substring(2, 8);
        // Create new user
        user = new User_1.default({
            email,
            password: hashedPassword,
            verificationCode
        });
        yield user.save();
        // Send verification email
        sendVerificationEmail(email, verificationCode);
        res.status(201).json({ message: 'User created successfully. Please verify your email.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Check if user exists
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check password
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Wrong email or password' });
        }
        // Check if user is verified
        if (!user.isVerified) {
            return res.status(401).json({ message: 'Email not verified' });
        }
        // Generate tokens
        const userId = user._id;
        const accessToken = generateAccessToken(userId);
        const refreshToken = generateRefreshToken(userId);
        // Set refresh token in cookies
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            // Add other cookie options here (secure, sameSite, etc.)
        });
        res.json({ accessToken });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.login = login;
const verify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { verificationCode } = req.body;
    try {
        // Find user by email and verification code
        const user = yield User_1.default.findOne({ verificationCode });
        if (!user) {
            return res.status(404).json({ message: 'Invalid verification code' });
        }
        // Update user to mark as verified
        user.isVerified = true;
        user.verificationCode = ''; // Clear verification code after verification
        yield user.save();
        res.json({ message: 'Email verified successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.verify = verify;
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token not found' });
    }
    try {
        // Verify refresh token
        const RefreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
        const decoded = jsonwebtoken_1.default.verify(refreshToken, RefreshTokenSecret);
        // Check if user exists
        const user = yield User_1.default.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Generate new access token
        const userId = user._id;
        const accessToken = generateAccessToken(userId);
        res.json({ accessToken });
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid refresh token' });
    }
});
exports.refreshToken = refreshToken;
const logout = (req, res) => {
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
};
exports.logout = logout;
// Helper function to generate JWT access token
const generateAccessToken = (userId) => {
    const payload = { userId };
    const AccessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    return jsonwebtoken_1.default.sign(payload, AccessTokenSecret, { expiresIn: '2m' });
};
// Helper function to generate JWT refresh token
const generateRefreshToken = (userId) => {
    const RefreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    return jsonwebtoken_1.default.sign({ userId }, RefreshTokenSecret);
};
// Helper function to send verification email
const sendVerificationEmail = (email, verificationCode) => {
    const mailOptions = {
        from: 'arjunmhz03@gmail.com',
        to: email,
        subject: 'Account Verification',
        html: `<p>Please click <a href="http://localhost:5000/verify/${verificationCode}">here</a> to verify your account.</p>`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
};
